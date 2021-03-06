from visualization.utils import FlatenDataset as flaten_Dataset
import re

def search_code(code):
    # TODO : rewrite this code 
    dataset = flaten_Dataset('flaten')
    results = []
    code_rex = re.compile("^%s*" %(code,))
    for item in dataset.find({'code': code_rex}):
        results.append({key: value 
                        for key, value in item.items() if (key != "_id") 
                                                        and (key != 'children')})
    for result in results:
        result['amount'] = int(result['amount'])

    return results
