from server.models import Dataset
import csv
import logging

class AbstractMuni(object):
    """abstract municipality class"""

    def __init__(self, fields, muni, logger_name, print_data=False):
        self.print_data = print_data
        self.fields = fields
        self.MUNI = muni
        self.logger = logging.getLogger(logger_name)

    def handle_sheet( self, year, filename ):
        dataset = Dataset('raw', self.MUNI, year)
        reader = csv.reader(file(filename, 'rb'))

        for line in reader:
            new_line = {}

            line_fields = [self.fields[index](line[index])
                                for index in self.fields.keys()]

            # check validity of line and write valid lines to DB
            fields_are_valid = [field.is_valid() for field in line_fields]

            if all(fields_are_valid):
                for field in line_fields:
                    # process fields
                    new_line[field.name] = field.process()

                # insert line data to DB
                self.print_str("%s : %s" %(line['code'], line['amount']))
                self.print_str(new_line)
                dataset.insert(new_line)
            else:
                invalid_fields = [' : '.join([field.name, field.value, field.error]) 
                                  for field in line_fields if field.is_valid()]
                self.logger.info('invalid fields: %s', ' '.join(invalid_fields))
        dataset.close()

    def print_str(self, data_str):
        if self.print_data:
            print data_str
