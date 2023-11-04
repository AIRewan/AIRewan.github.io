import urllib3
from selenium import webdriver
import time
from collections import defaultdict

mainUrl= "https://universe.leagueoflegends.com/en_AU/champion/"
secUrl= "https://leagueoflegends.fandom.com/wiki/"

champF = open("utils\\LolChamps.txt", "r")
lines = champF.readlines()
champF.close()

champDict = defaultdict(list)

opts= webdriver.ChromeOptions()
opts.add_argument('-headless')
driver= webdriver.ChromiumEdge(options=opts)

for line in lines:
    l = line.split(';')
    species = l[1]
    sex = l[2].strip()
    name= l[0]
    print(name)

    if " " in name:                     #league's own site
        n= name.replace(" ","")
    elif "." in name:
        n= name.replace('.', '')
    elif ". " in name:
        n= name.replace('. ', '')
    elif "'" in name:
        n=name.replace("'",'')
    elif '&' in name:
        n= name.split(" & ")
        n= n[0]
    elif 'Wukong' in name:
        n=name.replace("Wukong",'MonkeyKing')
    else:
        n= name

    url= mainUrl+n+'/'

    if " " in name:                 #wiki
        k= name.replace(" ", '_')
    elif "'" in name:
        k= name.replace("'", '%27')
    elif ". " in name:
        n= name.replace('. ', '')
    elif '&' in name:
        k=name.replace(" & ",'_%26_')
    else:
        k= name
        
    url2 = secUrl+k+'/LoL'

    driver.get(url)
    time.sleep(5)

    html = driver.execute_script("return document.body.innerHTML;")

    pic = html.split('data-am-url=')
    pic = pic[1].split(' style="background-image:')
    pic_poz= pic[1].split("; background-size:")
    pic_poz= pic_poz[0].split("background-position: ")
    pic_poz= pic_poz[1].split(';')
    picture_position = pic_poz[0]
    pic = pic[0].split('" ') 
    pic = pic[0]
    picture= pic[1:]

    
    
    role=html.split('Role</span></h5><h6>')
    role = role[1].split('</h6>')
    role = role[0]
    
    reg=html.split('Region</span></h5><h6>')
    reg = reg[1].split('</span>')
    region = reg[0].split('>')
    region = region[-1:]
    region = region[0]
    
    #------------------------------------------------------from wiki
    p= urllib3.connection_from_url(url2)
    html= p.urlopen('GET', url2)
    data= html.data.decode('utf-8')
    data= data.split('</figure>')

    title= data[1].split('</span></div>')
    title= title[0].split('>')
    title = title[-1:]
    title =title[0]  

    rel = data[1].split('Release date</h3>')
    rel = rel[1].split('</a>')
    rel = rel[0].split('>')
    rel = rel[-1:]
    rel=rel[0].split('-')
    release = rel[0] 

    man = data[1].split('Resource</h3>') 
    man = man[1].split('Range type</h3>')
    man= man[0].split('</a></span>')[0]
    man= man.split('>')
    mana = man[-1:]
    mana= mana[0]

    poz = data[1].split('Position(s)</h3>') 
    poz = poz[1].split('Resource</h3>')
    poz= poz[0].split('</a></span>')

    count= len(poz)
    position=""
    if count>2:
        poz.pop()
    for t in poz:
        t= t.split('>')
        t= t[-1:]
        if len(t[0])>0:
            position+= t[0]+", "
    position = position[0:-2]

    ran= data[1].split('Range type</h3>')
    ran= ran[1].split('</a></span>')
    ran = ran[0].split('>')
    ranged = ran[-1:]
    ranged = ranged[0]

    champDict[name].append([picture, sex, release, region, species, role, position, ranged, mana, title, picture_position])
    print(champDict[name])
    print()

    file = open("utils\\data.txt", "a")
    file.writelines(name+"*"+champDict[name][0][0]+';'+champDict[name][0][10]+";"+champDict[name][0][1]+";"+champDict[name][0][2]+";"+champDict[name][0][3]+";"+champDict[name][0][4]+";"+champDict[name][0][5]+";"+champDict[name][0][6]+";"+champDict[name][0][7]+";"+champDict[name][0][8]+";"+champDict[name][0][9]+"\n")
    file.close()




