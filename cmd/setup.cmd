cd %~dp0/../

call npm install

copy /-Y src\profilePath.ts.example src\profilePath.ts

PAUSE
