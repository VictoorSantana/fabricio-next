## Como subir para servidor produção

1. Executar ``npm run build`` na pasta raiz
2. Executar o arquivo ``pos-build.bat`` na pasta raiz, colocar a senha servidor quando pedir
3. Abrir servidor com PUTTY e acessar pasta `cd fabricio-next`
4. Rodar o comando `unzip -o build.zip`
5. Rodar o comando `pm2 restart next`