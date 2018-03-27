# Úkol 10:

Sync dat na server rest api bude probíhat samozřejmě v prohlížeči. To s sebou vždy nese
zodpovědnost programátorů zněpříjemnit šťouralům cestu k hacknutí kuchařky. Například by
někdo mohl chtít poslat nepovolené znaky v popisu kuchařky, nebo nedej bože dva obrázky
u receptu. Oceníme nástin nebo popis postupu/ů, jak takové kroky šťouralům znepříjemnit.

### Odpověď:
Znemožnit někomu, aby poslal na server jakýkoli request je nemožné. Člověk vždy může vzít nástroj jako např. Postman a na server cokoli poslat.

Proto je vhodné, mimo validaci inputu na frontendu, která by měla sloužit uživateli jako feedback na jeho vstup, validovat vstup i na serveru, neboť vstup ve  formuláři, který je sice "zvalidovaný" na frontendu, můžeme na server poslat tak jako tak (např. již zmíněným Postmanem).

Mimo klasické validace na serveru vůči inputu, bychom měli, pakliže naše aplikace pracuje s autentifikací, použít také ochranu před CSRF útoky, která se řeší např. pomocí generování tokenu do skrytého inputu. Poté, co se formulář (se skrytým inputem) odešle, server vyhodnotí, zda "macthuje" serverem vytvořený token.
