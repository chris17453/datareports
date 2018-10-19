import yaml

def load_yaml(file):
    with open(file, 'r') as stream:
        try:
            temp_yaml=yaml.load(stream)
            if 'uid' not in temp_yaml:
                print("Yaml is missing UID",file)
                return None
            return temp_yaml
        except yaml.YAMLError as exc:
            print(exc)