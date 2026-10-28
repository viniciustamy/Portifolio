# Currículo

`curriculo.html` é a fonte do PDF baixado no botão "Currículo" do site (`public/curriculo.pdf`).
A foto é `foto.jpg` (recorte de `public/profile-face.webp`, a mesma foto redonda do site).

## Atualizar

1. Edite o texto em `curriculo.html` (dá para conferir abrindo o arquivo no navegador).
2. Gere o PDF com o Edge em modo headless, no PowerShell, a partir da raiz do projeto:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --no-first-run --user-data-dir="$env:TEMP\edge-curriculo" --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="$PWD\public\curriculo.pdf" "file:///$($PWD -replace '\\','/')/resume/curriculo.html"
```

O layout é uma página A4. Se algum texto crescer e o PDF sair com duas páginas, diminua os
espaçamentos ou o tamanho da fonte no `<style>`.
