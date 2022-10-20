import random

with open('.env', 'w', encoding='utf8') as f:
    f.write('ACCESS_TOKEN_SECRET='+''.join(f'{i:02x}' for i in random.randbytes(64)))
