import pyarrow as py
import tiledb
import tiledbvcf
from tiledb.cloud.compute import Delayed
import logging

array_s3_uri = "s3://tiledb-inc-demo-data-no-public/tiledbvcf-arrays/v4/1kghicov/data"

logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S')

def get_non_empty_domain():
    ned = A.nonempty_domain()
    return ned

def read_vcf_data():
    with tiledb.open(array_s3_uri) as A:
        q = A.query()
        q["chr1", 20650541:20650542, "HG00096":"HG00097"]

ned = get_non_empty_domain()
print(ned)
# ((b'HLA-A*01:01:01:01', b'chrY'), (array(0, dtype=uint32), array(248956408, dtype=uint32)), (b'HG00096', b'NA21144'))

for i in range(20):
    print(i)
    read_vcf_data()