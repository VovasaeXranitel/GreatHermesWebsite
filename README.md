# Great Hermes Website

![Great Hermes repository card](assets/repository-card.svg)

[![Pages](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/pages.yml/badge.svg)](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/pages.yml)
[![Static checks](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/ci.yml/badge.svg)](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/ci.yml)
[![Website](https://img.shields.io/badge/website-thegreathermes.us-e7b949?style=flat-square)](https://thegreathermes.us)
[![GitHub Pages](https://img.shields.io/badge/pages-live-7ed9b8?style=flat-square)](https://vovasaexranitel.github.io/GreatHermesWebsite/)

Публичная визитка проекта Great Hermes.

Great Hermes развивает идею ИИ-агентов за пределы терминала: от CLI на ПК до помощника, с которым можно общаться через мессенджер, телефон, часы и другие привычные интерфейсы.

## Что это

Это лёгкий статический сайт без сборщика, фреймворка и runtime-зависимостей. Репозиторий специально держится простым, чтобы страницу можно было быстро править, проверять и публиковать через GitHub Pages.

## Быстрый старт

```powershell
git clone https://github.com/VovasaeXranitel/GreatHermesWebsite.git
cd GreatHermesWebsite
npm test
python -m http.server 8080
```

Открыть локально:

```text
http://127.0.0.1:8080
```

## Структура

```text
assets/                 Визуальные материалы для README и превью
.github/workflows/      CI и GitHub Pages deployment
index.html              Основная страница
favicon.svg             Иконка сайта
site.webmanifest        Метаданные для браузеров и PWA-превью
robots.txt              Правила индексации
CNAME                   Пользовательский домен GitHub Pages
scripts/check-site.mjs  Локальная smoke-проверка сайта
```

## Проверки

```powershell
npm test
```

Проверяется:

- наличие ключевых файлов;
- отсутствие битой кириллицы и mojibake;
- базовые SEO/Open Graph/PWA-метаданные;
- корректность `CNAME`;
- отсутствие типичных секретов в публичных файлах.

## Публикация

GitHub Pages публикует сайт из `main` через workflow:

```text
.github/workflows/pages.yml
```

Основные адреса:

- GitHub Pages: https://vovasaexranitel.github.io/GreatHermesWebsite/
- Целевой домен: https://thegreathermes.us

Если `thegreathermes.us` не открывается, проблема почти наверняка в DNS: домен должен быть направлен на GitHub Pages.

## Правила правок

- Держать сайт статическим, пока нет жёсткой причины добавлять сборку.
- Писать человеческим языком, без перегруза внутренней инфраструктурой.
- Проверять страницу на телефоне и десктопе перед публикацией.
- Не коммитить токены, tunnel credentials, `.env` и локальные файлы машины.
