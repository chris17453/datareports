(function ( $ ) {
    $.is_equal= function (value, other) {
            // Get the value type
            var type = Object.prototype.toString.call(value);

            // If the two objects are not the same type, return false
            if (type !== Object.prototype.toString.call(other)) return false;

            // If items are not an object or array, return false
            if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

            // Compare the length of the length of the two items
            var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
            var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
            if (valueLen !== otherLen) return false;

            // Compare two items
            var compare = function (item1, item2) {

                // Get the object type
                var itemType = Object.prototype.toString.call(item1);

                // If an object or array, compare recursively
                if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                    if (!$.is_equal(item1, item2)) return false;
                }

                // Otherwise, do a simple comparison
                else {

                    // If the two items are not the same type, return false
                    if (itemType !== Object.prototype.toString.call(item2)) return false;

                    // Else if it's a function, convert to a string and compare
                    // Otherwise, just compare
                    if (itemType === '[object Function]') {
                        if (item1.toString() !== item2.toString()) return false;
                    } else {
                        if (item1 !== item2) return false;
                    }

                }
            };

            // Compare properties
            if (type === '[object Array]') {
                for (var i = 0; i < valueLen; i++) {
                    if (compare(value[i], other[i]) === false) return false;
                }
            } else {
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        if (compare(value[key], other[key]) === false) return false;
                    }
                }
            }

            // If nothing failed, return true
            return true;

        }
        
    $.fn.datareports = function( options ) {
		var settings = $.extend({
		   api_target          : "/api/data_report",                    //the controller url for the webAPI
		   fetch_method        : "fetch",                               //the controller action to call data retreival
		   config_method       : "config",                              //the controller action to call data retreival
		   uid                 : null,                                  //the identifer for the report
		   cancel_function     : null,
		   dialog_function     : null,                                  //for a custom message call back
		   api_error           :"API failure",					        //generic api error message
		   no_results_msg      :"No results found",
           use_zebra_rows      : true,
           page_length         : 10,
           no_results_msg      : "No results found"
		}, options );

		var id;
		var element;
		var tablesorter_table;
		var initial_query		
		var data_stream;
		
		//********************************************************************************************
		//Init of internal plugin
		//********************************************************************************************
		var datareports=function(element,options){
			this.options          =options;                             //options for the plugin
			this.api_target       =options.api_target;                  //the controller url for the webAPI
			this.controller_name  =options.controller_name;             //the controller name on the webapi
			this.element          =element;                             //the curent html element
			this.id= 'datareports_' + Math.random().toString(36).substr(2, 9);
			this.tablesorter_table=this.id+"_table";
			this.multi_search_class      ='data-report-multi-search';
			this.multi_search_reset_class='data-report-reset';
			this.data_config              =null;
			
			this.initial_query=true;
			this.build();                                               //create the html and inject it into the element.
			this.bind();                                                //attach events to newly created HTML
			//this.load(options.path,options.filters);                    //load and populate the initial data for the file browser.
		};
        //user defined functions
    datareports.prototype.build_report_filters=function(){
            var properties       =this.data_config.properties;
            var property_ordinals=this.data_config.property_ordinals;
            var filterDefaults=[];
            var thead ="";
            var tbody ="";
            var tfoot ="";
            var name  ="";
            var tbr   ="";
            for (var property_ordinal in property_ordinals) {
                var ordinal_index=property_ordinals[property_ordinal];
                var property=properties[ordinal_index];
                if (!property.visible) continue;
                thead += "<th ";
                if (!property.filter) thead += `data-name="${property.name}" data-filter="false" `;
                if (!property.sort  ) thead += `data-name="${property.name}" data-sorter="false" `;
                if ( property.filter &&  undefined!=property.options && property.options.length>0) {      //if filter and has select options
                    thead +=` class="filter-select form-control" ` ;
                }
                if(property.options && property.options.Length>0){
                    for(var oindex in property.options){
                        var option=property.options[oindex];
                        if(option.default){
                            thead+=`data-value="${option.value}"`;
                            filterDefaults[oindex]= option.value;
                        }
                    }
                }

    

                name = property.name;
                if (property.display !== "") name = property.display;
                if (name==="*") name = "";
                thead += ">" + name + "</th>";
				tfoot += "<td class=''";
				if ( property.sort  ) tfoot += `data-name="${property.name}" data-sorter="true" `;
				if (!property.sort  ) tfoot += `data-name="${property.name}" data-sorter="false" `;
				tfoot +="><div class='tablesorter-header-inner'>"+name+"</div></td>";
				
                tbr+="<td><span>&nbsp;</span></td>";
            }
            var page_length=this.options.page_length;
            for(var i=0;i<page_length;i++) tbody='<tr>'+tbr+'</tr>';
            return {'filterDefaults':filterDefaults,'thead':thead,'tfoot':tfoot,'tbody':tbody};
        }        
        datareports.prototype.build=async function(){
			//some async function
			try {
				await this.load_data_config(options.uid);					//cache the reports configuration before build.
			} catch(e) {
				console.log(e);
				return;
			}
					
			if(this.data_config.msg=='Error') {
				$(this.element).html('There has been an error. Please check your configuration');
			
				return;
			}
			$(this.element).html('');
			
			var css=this.build_css();
			var multi_search=`
			<div class="input-group mb-3">
			  <div class="input-group-prepend">
				<span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
			  </div>
			  <input data-uid="${this.id}" type="text" class="form-control ${this.multi_search_class}" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1">
			  <div class="input-group-append">
				<span class="input-group-text ${this.multi_search_reset_class}" data-uid="${this.id}"><i class="fas fa-trash"></i></span>
			  </div>
			  
			</div>`;
			var has_multi_search=false;
			for(var i in this.data_config.properties) {
				if(this.data_config.properties[i].multi_search==true)  has_multi_search=true;
			}
			if(!has_multi_search)  multi_search="";
			this.filters=this.build_report_filters();

			var pagination=`
			  <ul class="pagination ts-pager">
				<li class="${this.id}_first page-item"><a class="page-link" href="#" tabindex="-1"><span aria-hidden="true">&laquo;</span></a></li>
				<li class="${this.id}_prev page-item"><a class="page-link" href="#" tabindex="-1"><span aria-hidden="true">&lsaquo;</span></a></li>
				<li class="page-item "  style="width:200px"><div class="page-link text-center mx-auto ${this.id}_page_display pager-nowrap" data-pager-output-filtered="{startRow:input} – {endRow} / {filteredRows} of {totalRows} total rows"></div></li>
				<li class="${this.id}_next page-item"><a class="page-link" href="#"><span aria-hidden="true">&rsaquo;</span></a></li>
				<li class="${this.id}_last page-item"><a class="page-link" href="#"><span aria-hidden="true">&raquo;</span></a></li>
				<li class="page-item"><a class="page-link">
						<select class="border-0 ${this.id}_page_size" title="length">
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="25">25</option>
							<option value="30">30</option>
						</select>
					</a>
				</li>
				<li class="page-item"><a class="page-link">
					<select class="border-0 ${this.id}_goto_page" title="page option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
				</a></li>
			</ul>
			`;
			
			
			
			this._container=$(`
			${css}
			${multi_search}
            <table class="${this.tablesorter_table} table table-bordered table-striped table-sm table-inverse">
            <thead class="thead-light">${this.filters.thead}</thead>
            <tbody></tbody>
            <tfoot>${this.filters.tfoot}</tfoot>
            </table>
			${pagination}`).appendTo(this.element);
            $(".data-report-heading").html(this.data_config.display);
			this.init_tablesorter();
			$(`.${this.tablesorter_table}`).dblclick(function(e){
				found=0
				parent=e.target;
				if(parent.tagName=="SPAN"){
					parent=parent.parentElement;
				} 
				if(parent.tagName=="TD"){
					parent=parent.parentElement;
					found=1
				} 

				if (found===0) return;
					$('#edit_record').modal('show');
					o=""
					form_html=''
					for(i=0;i<parent.children.length;i++){
						value=parent.children[i].textContent;
						display=this.config.headerContent[i]
						form_html+=`<div class="input-group mb-2 mr-sm-2">
						<div class="input-group-prepend ">
						  <div class="input-group-text mod_w">${display}</div>
						</div>
						<input type="text" class="form-control" id="${display}" placeholder="or sort of info" value='${value}'>
						</div>`;
					}
					$('#edit-body').html(form_html)
					footer=`
					<div class="float-left">
					  <button type="submit" class="btn btn-danger my-1">Delete</button>
				    </div>
				    <div class="float-right">
				      <button type="submit" class="btn btn-warning my-1">Update</button>
				    </div>`
				  $('#edit-footer').html(footer);
				  $('#edit-header').html("Update Record");
			});

			$(`#edit-button`).click(function(e){
				parent=$(`.tablesorter`)[0]
				form_html=''
				for(i in parent.config.headerContent){
					display=parent.config.headerContent[i]
					form_html+=`<div class="input-group mb-2 mr-sm-2">
					<div class="input-group-prepend ">
					<div class="input-group-text mod_w">${display}</div>
					</div>
					<input type="text" class="form-control" id="${display}" placeholder="${display} or some sort of info">
					</div>`;
				}
				$('#edit-body').html(form_html);
				footer=`'<div class="float-right">
				<button type="submit" class="btn btn-primary my-1">Insert</button>
				</div>`
				$('#edit-footer').html(footer);
				footer=`'<div class="float-right">
				<button type="submit" class="btn btn-primary my-1">Insert</button>
				</div>`
				$('#edit-header').html("Create Record")
			});
		}
		
        datareports.prototype.bind=function (){
			return this.data.config.properties;
		}
			datareports.prototype.bind=function (){
				var self=this;
            $(this.element).on("remove",$.proxy(this.destroy, this)); //listen for a kill "this plugin" event 
			//$(this.element).on("change",".browsy-show-hidden-folders" ,function(e) {  self.refresh(); });
			
			//$(this.element).on("click",`.${this.multi_search_class}`       ,function(e) {  //self.multi_search(e);});
			$(this.element).on("click",`.${this.multi_search_reset_class}` ,function(e) {  self.reset(e); });
			
			$(this.element).on('keypress',`.${this.multi_search_class}`,function (e) {
			  if (e.which == 13) {
				self.multi_search(e);
				return false;
			  }
			});
			

		}
		datareports.prototype.unbind=function(){
            //clear variables
			//$(this.element).on("click",`.${this.multi_search_class}`      );
			$(this.element).on("click",`.${this.multi_search_reset_class}`);
		}
        datareports.prototype.destroy=function(){
            this.unbind();
            $(this.element).html('');       //cleanup injected HTML.
		}
        datareports.prototype.close=function(){
            this.destroy();
		}
        //********************************************************************************************
		// data-report ajax function
		//*******************************************************************************************
        datareports.prototype.call_api =async function(method,da){
			try{
				if(da!==undefined && da!==null)  {
						this.data_object=da;
					} else this.data_object={};
					return await $.ajax({type       : "POST", 
							url        : this.api_target + "/" + method, 
							contentType: "application/json; charset=utf-8",
							dataType   : "json" ,
							data       : JSON.stringify(this.data_object)//,
		/*					headers    : {  'Access-Control-Allow-Credentials' : true,
											'Access-Control-Allow-Origin':'*',
											'Access-Control-Allow-Methods':'POST',
											'Access-Control-Allow-Headers':'application/json'
								}
								*/
				});
			} catch(e) {
				console.log(e);
			}
         }
		//********************************************************************************************
		// Tablesorter reset state of data-report
		//********************************************************************************************
        datareports.prototype.reset=function(e){
			$(`.${this.multi_search_class}[data-uid=${this.id}`).val('');               //update multi search
			//this.reset_date_range();      
			this.table.trigger('sortReset');                                            //reset sort and filter
			//$.tablesorter.setFilters( this.table, this.filterDefaults, true );
			this.table.trigger('filterReset');
			this.table.trigger('pageAndSize', [0, this.options.page_length]);           //reset pagination and size of pages
			this.table.trigger('pagerUpdate');                              
			this.table.trigger('Update');                                   
			
		}
		//********************************************************************************************
		// Tablesorter send search request
		//********************************************************************************************
        datareports.prototype.multi_search=function(report_uid){
			$(this.table).trigger('pagerUpdate');                           
			$(this.table).trigger('Update');                                
        }
        //********************************************************************************************
		// data-report gab configuration data
		//********************************************************************************************
        datareports.prototype.load_data_config=async function(report_uid){
			var results=await this.call_api(this.options.config_method,{uid:report_uid});
			this.data_config=results;
			var x=this;
        }
        datareports.prototype.build_api_url=function(){
            return this.api_target+'/'+this.options.fetch_method;
            //return "http://localhost:5000/operation/";
            //return          beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
        }
        //********************************************************************************************
        // data-report gab configuration data
        //********************************************************************************************
        datareports.prototype.ajax_error=function(){
            return false;
		}
		//********************************************************************************************
		// Tablesorter ajax object actualy sent to webAPI
		//********************************************************************************************
        datareports.prototype.build_data_object=function(data_uid,page,page_length,sort_options=null,filter_options=null,multi_search=null){
			var data_object={
				'contentType': "application/json", 
				method		: "POST", 
				dataType	: "json",
				crossDomain : true,	
				async: true,
				cache: false,
				headers		:{"JWT":this.JWT},
				data:JSON.stringify( 
					{	uid           :data_uid,
						format        :"json",
						paginate      :true,
						page          :page,
						page_length   :page_length,
						reload        :false,
						hide_blanks   :false,
						hide_errors   :false,
						hide_comments :false,
						multi_search  :multi_search,
						filter        :filter_options,
						sort          :sort_options
											} )
			}
			return data_object;
		}
		//********************************************************************************************
		// Tablesorter ajax poprocessing... doing stuff with the results
		//********************************************************************************************
		datareports.prototype.ajax_processing=function(data) {
            if(!data) return this.cached_results;
			if (data && data.hasOwnProperty('records')) {
				if(data.stats.errors!=0) return this.cached_results;
				var index, record , row, c, d = data.records;
				var table=$(this.settings.table_class);
				var config=this.settings.parent_self.data_config;
				var total = data.stats.visible;
				var rows = []
				var len = d.length;
				var page_length=this.size;
				if(len===0) {
				   // $.tablesorter.showError(, "No Data Found");d

				}
				var computed_index=0;
				for (record = 0; record < page_length; record++) {
					row = []; // new row array
					index = 0;
					if(record>=len) {
						for(var i in config.property_ordinals) {
							computed_index=config.property_ordinals[i];
							if(config.properties[computed_index].visible==false) continue;
							if(computed_index==-1) continue;
							row.push("<span>&nbsp;</span>");
						}
					} else {
						var row=[];
						for(var i in config.property_ordinals) {
							computed_index=config.property_ordinals[i];
							if(computed_index==-1) continue;
							if(config.properties[computed_index].visible==false) continue;
							name=config.properties[computed_index].name
							if(undefined==d[record]['model'][name]) {
								data_value=d[record]['model'][computed_index]
							} else {
								data_value=d[record]['model'][name]
							}
							if(undefined==data_value) data_value=""

							row.push("<span>" + data_value + "</span>");
						}
					}
					rows.push(row); // add new row array to rows array
				}
				var cA=[];
				for(var i in config.property_ordinals) {
					computed_index=config.property_ordinals[i];
					if(!config.properties[computed_index].visible) continue;
					if(computed_index==-1) continue;
					name=config.properties[computed_index].display
					if(name=="") name=config.properties[computed_index].name;
					if(name==="*") name="";
					cA.push(name);
				}
				this.cached_results=[data.stats.visible,rows, cA];
				return this.cached_results;
			}
		}
		//********************************************************************************************
		// Tablesorter pre send ajax object creation. add filters, sorts page index length etc...
		//*******************************************************************************************
		datareports.prototype.table_sorter_custom_ajax=function (table, url) {
			var obj         = table.config.pager.ajaxObject;
			var page        = table.config.pager.page;
			var pageLength  = table.config.pager.size;
			var sort        = [];
			var filter      = [];
			var key, data, item;
			var dir="";
			var sortListTemp=table.config.sortList;
			var sort  =[];
			var filter=[];
			var parent=this.settings.parent_self;
			var uid=parent.options.uid;
			var p=parent.data_config.properties;
			var sl=table.config.sortList;

			for (item in table.config.sortList) {
				var key = table.config.sortList[item][0];
				var data = table.config.sortList[item][1];
				var ordinal=parent.data_config.property_ordinals[key];
					if(null==sort) {
						sort=[];
					}
					sort.push([ordinal,data]);
            }
            var sort_changed=!$.is_equal(this.old_sort,sort);
            this.old_sort=sort;

            var multi_search=$(`.${parent.multi_search_class}[data-uid=${parent.id}`).val();
               
        for (item in table.config.lastSearch) {
			data = table.config.lastSearch[item];
			key = item;
			var ordinal=parent.data_config.property_ordinals[key];
			if(undefined===data || data==="") continue;
			filter.push([ordinal, data]); 
        }
            if(multi_search!="" || sort_changed) { 
                page=0;
                this.page=0; 
            }
            
			table.config.pager.ajaxObject = parent.build_data_object(uid,page,pageLength,sort,filter, multi_search);
			return url;
		}
	    //********************************************************************************************
		// Tablesorter css creation. for custom overflow etc...
		//*******************************************************************************************
        datareports.prototype.build_css=function(){
			if(null==this.data_config) {
				alert ("Missing Config")
				return "";
			}
			var css = `
			<style type='text/css'>
			.${this.tablesorter_table} .tablesorter { width: 100%; }
			`;
			var i=0;
			var p=this.data_config.property_ordinals;
			for (var index in p) {
				var ordinal=p[index];
				if (ordinal===null) continue;
				var property=this.data_config.properties[ordinal];
				if (!property.visible) continue;
				css +="."+this.tablesorter_table+"  td:nth-child(" + (parseInt(i)+1) + ") {";
				if(property.overflow)           css +="overflow:visible !important; ";
				css += "max-width: 0; "
				if(property.width!==0) {
					css += "width: " + property.width + "px;";
				}
				css += "}\r\n";
				i++;
			}
			css+= `</style>`
			return css;
		}
	    //********************************************************************************************
		// Tablesorter configuration
		//*******************************************************************************************
		datareports.prototype.init_tablesorter=function () {
			var widgets=[];
			var widget_options={};
			if(this.options.use_zebra_rows)      {
				widget_options.zebra=["even", "odd"];
				widgets.push("zebra");
			}
			widgets.push("filter");
			widgets.push("columns");
			     // class names added to columns when sorted
			widget_options.columns=[ "primary", "secondary", "tertiary" ];
			widget_options.filter_cssFilter='form-control-sm';

			 
			
			/*widgets.push("editable");

			
			
		    var widget_options= {
				editable_columns       : [0,1,2],       // or "0-2" (v2.14.2); point to the columns to make editable (zero-based index)
				editable_enterToAccept : true,          // press enter to accept content, or click outside if false
				editable_autoAccept    : true,          // accepts any changes made to the table cell automatically (v2.17.6)
				editable_autoResort    : false,         // auto resort after the content has changed.
				editable_validate      : null,          // return a valid string: function(text, original, columnIndex) { return text; }
				editable_focused       : function(txt, columnIndex, $element) {
				  // $element is the div, not the td
				  // to get the td, use $element.closest('td')
				  $element.addClass('focused');
				},
				editable_blur          : function(txt, columnIndex, $element) {
				  // $element is the div, not the td
				  // to get the td, use $element.closest('td')
				  $element.removeClass('focused');
				},
				editable_selectAll     : function(txt, columnIndex, $element) {
				  // note $element is the div inside of the table cell, so use $element.closest('td') to get the cell
				  // only select everthing within the element when the content starts with the letter "B"
				  return /^b/i.test(txt) && columnIndex === 0;
				},
				editable_wrapContent   : '<div>',       // wrap all editable cell content... makes this widget work in IE, and with autocomplete
				editable_trimContent   : true,          // trim content ( removes outer tabs & carriage returns )
				editable_noEdit        : 'no-edit',     // class name of cell that is not editable
				editable_editComplete  : 'editComplete' // event fired after the table content has been edited
			  };
			
			*/
			this.table=$("."+this.tablesorter_table);
			this.table.tablesorter({
				theme: "bootstrap",
				widthFixed: true,
				widgets: widgets ,
				widgetOptions:widget_options
			})
			
			// config event variable new in v2.17.6
		/*	.children('tbody').on('editComplete', 'td', function(event, config) {
			  var $this = $(this),
				newContent = $this.text(),
				cellIndex = this.cellIndex, // there shouldn't be any colspans in the tbody
				rowIndex = $this.closest('tr').attr('id'); // data-row-index stored in row id

			  // Do whatever you want here to indicate
			  // that the content was updated
			  $this.addClass( 'editable_updated' ); // green background + white text
			  setTimeout(function() {
				$this.removeClass( 'editable_updated' );
			  }, 500);

			//  /*
			  $.post("mysite.php", {
				"row"     : rowIndex,
				"cell"    : cellIndex,
				"content" : newContent
			  });
			//  */
			//})*/
			.on('filterEnd filterReset pagerComplete', function(e, table2){
				var fr, table = this;
				if (table.config.pager) {
					if($.tablesorter.showInfo){                         //custom info hanler...
						fr = table.config.pager.filteredRows;
						if (fr === 0) {
							$.tablesorter.showInfo(table,table.config.pager.settings.no_results_msg);
						} else {
							$.tablesorter.removeInfo(table);
						}
					}//if function exists
				}
			})
			.tablesorterPager({
				container           : $(".ts-pager"),
				table_class         : "."+this.tablesorter_table,
				ajaxUrl             : this.build_api_url(),
				customAjaxUrl       : this.table_sorter_custom_ajax,
				ajaxError           : this.ajax_error,
				ajaxObject          : this.build_data_object(),
				ajaxProcessing      : this.ajax_processing,
				processAjaxOnInit   : true,
                output              : '{startRow} - {endRow} of {totalRows}',
				updateArrows        : true,
				page                : 0,
				size                : this.options.page_length,
				savePages           : true,
				storageKey          : this.tablesorter_table+'tablesorter-pager',
				pageReset           : 0,
				fixedHeight         : false,
				removeRows          : false,
				countChildRows      : false,
				cssNext             : '.'+this.id+'_next',
				cssPrev             : '.'+this.id+'_prev',
				cssFirst            : '.'+this.id+'_first',
				cssLast             : '.'+this.id+'_last',
				cssGoto             : '.'+this.id+'_goto_page',
				cssPageDisplay      : '.'+this.id+'_page_display',
				cssPageSize         : '.'+this.id+'_page_size',
				cssDisabled         : 'disabled',
				cssErrorRow         : 'tablesorter-errorRow',
				parent_self         : this,
                no_results_msg      : this.options.no_results_msg
				})
		}//end if
	    datareports.prototype.obj_to_string=function(obj){
            return  JSON.stringify(obj);
        }
        return this.each(function() {
            new datareports(this,settings);
        });

    };
    //********************************************************************************************
    // Extend tablesorter to give messages for no results found
    //*******************************************************************************************
	var ts = $.tablesorter;
	
    ts.showInfo= function( table,msg) {
        var $row,
            $table = $( table ),
            c = $table[0].config,
            wo = c && c.widgetOptions,
            infoRow = 'tablesorter-infoRow',
            typ = typeof xhr,
            valid = true,
            message = msg,
            removeRow = function(){
                c.$table.find( 'thead' ).find( '.' + infoRow ).remove();
            };

        if ( !$table.length ) {
            console.error('tablesorter showInfo: no table parameter passed');
            return;
        }
        removeRow();
        if(message==="") message="No Data Returned";
        // allow message to include entire row HTML!
        var page_length=10;
        var msg_row=page_length/2;
        var msg="";
        for(var i=0;i<page_length;i++) {
            if(i!=msg_row) msg+=`<tr class="tablesorter_info_row_blank"><td colspan="${c.columns}">&nbsp</td></tr>`;
            else           msg+=`<tr class="tablesorter_info_row"><td colspan="${c.columns}"><div>${message}</div></td></tr>`;
        }
        $row = ( /tr\>/.test(message) ? $(message) : $(msg) )
        // add error row to thead instead of tbody, or clicking on the header will result in a parser error
            .appendTo( c.$table.find( 'thead:first' ) )
            .addClass( infoRow )
            .attr({
                role : 'alert',
                'aria-live' : 'assertive'
            });

    };

    ts.removeInfo= function( table,msg) {
        var $table = $( table ),
            c = $table[0].config,
            infoRow = 'tablesorter-infoRow',
            removeRow = function(){
                c.$table.find( 'thead' ).find( '.' + infoRow ).remove();
            };

        if ( !$table.length ) {
            console.error('tablesorter showInfo: no table parameter passed');
            return;
		}
		
        removeRow();
    };





}( jQuery ));           
