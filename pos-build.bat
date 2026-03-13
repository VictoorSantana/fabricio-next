@echo off

echo ==========================
echo BUILD NEXTJS DEPLOY
echo ==========================

set ROOT=%cd%
set BUILD=%ROOT%\build

for %%I in ("%cd%") do set pasta_atual=%%~nxI
for %%I in ("%cd%\..") do set pasta_pai=%%~nxI
for %%I in ("%cd%\..\..") do set pasta_avo=%%~nxI

echo Pasta atual: %pasta_atual%
echo Pasta pai: %pasta_pai%
echo Pasta avo: %pasta_avo%

echo Limpando pasta antiga...
rmdir /s /q "%BUILD%" 2>nul

mkdir "%BUILD%"

echo.
echo Copiando standalone...
robocopy "%ROOT%\.next\standalone\%pasta_avo%\%pasta_pai%\%pasta_atual%" "%BUILD%" /E

echo.
echo Copiando public...
robocopy "%ROOT%\public" "%BUILD%\public" /E

echo.
echo Copiando static...
robocopy "%ROOT%\.next\static" "%BUILD%\public\_next\static" /E


echo.
echo ==========================
echo BUILD FINALIZADO
echo ==========================

set SRC=build
set DEST=build.zip

powershell -Command "Compress-Archive -Path '%SRC%\*' -DestinationPath '%DEST%' -Force"

echo Arquivo ZIP criado: %DEST%

scp -r %DEST% root@191.252.93.18:/root/fabricio-next/

pause