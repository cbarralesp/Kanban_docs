# 11 · Git: cómo sube cada alumno el proyecto a su repositorio

Comandos para **PowerShell** en Windows. Donde dice `USUARIO` va **tu** usuario de GitHub.

## 0 · Una sola vez por computador

```powershell
git config --global user.name "Nombre Apellido"
git config --global user.email "correo@ejemplo.com"
```

## 1 · Crear tu repositorio vacío en GitHub

En github.com → **New repository** → nombre (por ejemplo `kanban-backend`) → **sin marcar** README, .gitignore ni licencia → **Create repository**.

> Si lo creas vacío, la primera subida funciona sin conflictos.

## 2 · Opción A (recomendada): partir clonando el proyecto base

```powershell
git clone https://github.com/cbarralesp/kanban_backend_base.git kanban-backend
cd kanban-backend
```

El clon queda conectado al repositorio del profesor. Lo renombras como `profesor` y agregas el tuyo como `origin`:

```powershell
git remote rename origin profesor
git remote add origin https://github.com/USUARIO/kanban-backend.git
git push -u origin main
```

## 2 · Opción B: tienes la carpeta sin Git (ZIP o hecha desde cero)

```powershell
cd ruta\de\tu\proyecto
git init -b main
git add .
git commit -m "Proyecto inicial"
git remote add origin https://github.com/USUARIO/kanban-backend.git
git push -u origin main
```

La primera vez, Windows abre el navegador para iniciar sesión en GitHub.

## 3 · Cada vez que terminas un paso de la guía

```powershell
git status
git add .
git commit -m "feat: paso 2 - enums, entity y repository"
git push
```

> **Antes de cada commit**, `git status` **no** debe mostrar `target/`, `logs/` ni `node_modules/`. El `.gitignore` del proyecto ya los excluye; si aparecen, revisa que no hayas borrado o reemplazado ese archivo.

Ejemplos de mensajes, uno por paso de la guía:

| Paso | Mensaje de commit |
|---|---|
| 2 | `feat: paso 2 - enums, entity y repository` |
| 3 | `feat: paso 3 - DTOs, excepciones y manejo de errores` |
| 4 | `feat: paso 4 - mapper y service` |
| 5 | `feat: paso 5 - Swagger y CORS` |
| 6 | `feat: paso 6 - controller` |
| 7 | `test: paso 7 - pruebas del service y del controller` |

## 4 · Recibir cambios del profesor (solo si usaste la Opción A)

```powershell
git pull profesor main
```

## Frontend

Mismo procedimiento con `https://github.com/cbarralesp/kanban-frontend.git` y un repositorio `kanban-frontend` tuyo. Después de clonar, instala las dependencias (`node_modules` no viene en el repositorio):

```powershell
npm install
```

## Errores frecuentes

| Mensaje | Causa | Solución |
|---|---|---|
| `remote origin already exists` | Ya había un `origin` | `git remote set-url origin https://github.com/USUARIO/REPO.git` |
| `rejected ... (fetch first)` | Tu repositorio en GitHub tiene commits que tú no tienes (por ejemplo, lo creaste con README) | `git pull --rebase origin main` y luego `git push`. **Nunca** `--force` |
| `src refspec main does not match any` | Aún no hay commits, o tu rama se llama `master` | Haz el primer commit, o `git branch -M main` |
| `Permission denied` / `403` | El computador tiene guardada la sesión de otra cuenta de GitHub | *Administrador de credenciales* → *Credenciales de Windows* → borra `git:https://github.com` y vuelve a hacer `git push` |
| `Author identity unknown` | Faltó el paso 0 | Ejecuta los dos `git config --global` |
