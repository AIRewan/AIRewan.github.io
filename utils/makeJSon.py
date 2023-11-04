champF = open("AIRewan.github.io\\utils\\data.txt", "r")
champ0 = champF.readlines()
champs = sorted(champ0)
champF.close()

quoteS = open("AIRewan.github.io\\utils\\quotes.txt", "r")
quote0= quoteS.readlines()
quotes= sorted(quote0)
quoteS.close()

QD={}
for q in quotes:
    key= q.split(';')[0]
    values = q.split(';')[1].split('"*"')
    values[0]=values[0][1:]
    values[-1]=values[-1].strip()[0:-1]
    QD[key]=values

file = open("AIRewan.github.io\\source\\data.json", "a")
file.writelines("{\n")
file.close()
                  #         0           1           2     3     4       5    6        7            8      9             10
for c in champs:  #Lux*  picture;picture_position;Female;2010;Demacia;Human;Mage;Middle, Support;Ranged;Mana;the Lady of Luminosity

    champion = c.split('*')[0] 
    data = c.split('*')[1] 
    picture = data.split(';')[0]
    picture_position= data.split(';')[1]
    sex = data.split(';')[2]
    release = data.split(';')[3]
    home = data.split(';')[4]
    specie = data.split(';')[5]
    type = data.split(';')[6]
    position = data.split(';')[7]
    range = data.split(';')[8]
    mana = data.split(';')[9]
    title = data.split(';')[10].strip()
    quote = ""
    for q in QD[champion]:
        if "\\'" in q:
            q=q.replace("\\'","\n'")
        quote+=('"{qa}"').format(qa=q)
        if QD[champion][-1]!=q:
            quote+=","

    file = open("AIRewan.github.io\\source\\data.json", "a")
    file.writelines(('  "{ch}": {{\n').format(ch=champion))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{picture=}'.split('=')[0], n=picture))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{picture_position=}'.split('=')[0], n=picture_position))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{sex=}'.split('=')[0], n=sex))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{release=}'.split('=')[0], n=release))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{home=}'.split('=')[0], n=home))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{specie=}'.split('=')[0], n=specie))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{type=}'.split('=')[0], n=type))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{position=}'.split('=')[0], n=position))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{range=}'.split('=')[0], n=range))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{mana=}'.split('=')[0], n=mana))
    file.writelines(('      "{k}": "{n}",\n').format(k= f'{title=}'.split('=')[0], n=title))
    file.writelines(('      "{k}": [\n          {n}\n]\n').format(k= f'{quote=}'.split('=')[0], n=quote))
    file.writelines('},\n')
    if c != champs[-1]:
        file.close()
    else:
        file.writelines('}')
        file.close()




