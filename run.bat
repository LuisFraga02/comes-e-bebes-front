@ECHO OFF
cd .\frontend\
start "front" cmd.exe /k "npm run dev"
explorer http://localhost:5173/
rem esse arquivo é para rodar o frontend em um terminal separado 
rem e abrir o localhost:5173 no navegador
rem não consegui rodar o java pelo terminal, então o backend é manual pelo intellij