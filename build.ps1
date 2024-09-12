terser .\js\disasters.js .\js\droids.js .\js\gen.js .\js\helper.js .\js\items.js .\js\physics.js .\js\w.js .\js\zzfx.js .\js\main.js --output dist/bundle.js --compress toplevel --mangle toplevel --toplevel
Set-Location .\dist
$tersersize = Get-Item .\bundle.js
npx roadroller bundle.js -o bundle.js
$roadrollersize = Get-Item .\bundle.js
Set-Location ../
$assetsize = Get-Item .\assets\*
Remove-Item .\dist\assets -Recurse
Copy-Item .\assets .\dist\assets -Recurse
Compress-Archive dist/* bundle.zip -Force -CompressionLevel Optimal
$zipsize = Get-Item .\bundle.zip
$zipsize = "ZIP SIZE: " + $zipsize.Length
$assetsize = "ASSETS SIZE: " + $assetsize.Length
$roadrollersize = "ROADROLLER SIZE: " + $roadrollersize.Length
$tersersize = "TERSER SIZE: " + $tersersize.Length
Write-Output $tersersize
Write-Output $roadrollersize
Write-Output $assetsize
Write-Output $zipsize