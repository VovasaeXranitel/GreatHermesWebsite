# Great Hermes Website

![Great Hermes repository card](assets/repository-card.svg)

[![Pages](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/pages.yml/badge.svg)](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/pages.yml)
[![Static checks](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/ci.yml/badge.svg)](https://github.com/VovasaeXranitel/GreatHermesWebsite/actions/workflows/ci.yml)
[![GitHub Pages](https://img.shields.io/badge/pages-live-b99355?style=flat-square)](https://vovasaexranitel.github.io/GreatHermesWebsite/)
[![Domain](https://img.shields.io/badge/domain-thegreathermes.us-6aa99b?style=flat-square)](https://thegreathermes.us)

Публичный сайт проекта Great Hermes.

Great Hermes развивает идею ИИ-агентов за пределы терминала: от CLI на ПК к рабочему помощнику, который доступен через мессенджеры, мобильный клиент, часы и другие привычные интерфейсы.

## Назначение

Этот репозиторий содержит статический лендинг проекта. Он должен объяснять идею спокойно и профессионально, без перегруза внутренней инфраструктурой.

## Локальный запуск

```powershell
git clone https://github.com/VovasaeXranitel/GreatHermesWebsite.git
cd GreatHermesWebsite
npm test
python -m http.server 8080
```

Открыть:

```text
http://127.0.0.1:8080
```

## Структура

```text
assets/                 Изображения для README и social preview
.github/workflows/      CI и GitHub Pages deployment
index.html              Основная страница
favicon.svg             Иконка сайта
site.webmanifest        Метаданные для браузеров
robots.txt              Правила индексации
sitemap.xml             Карта сайта
CNAME                   Пользовательский домен GitHub Pages
scripts/check-site.mjs  Smoke-проверка сайта и публичных файлов
```

## Проверки

```powershell
npm test
```

Проверяется:

- наличие обязательных файлов;
- отсутствие битой кириллицы;
- наличие SEO/Open Graph/Twitter/PWA-метаданных;
- корректность `CNAME`;
- отсутствие типовых секретов в публичных файлах.

## Публикация

GitHub Pages публикует сайт из ветки `main` через:

```text
.github/workflows/pages.yml
```

Адреса:

- GitHub Pages: https://vovasaexranitel.github.io/GreatHermesWebsite/
- Целевой домен: https://thegreathermes.us

Если `thegreathermes.us` не открывается, нужно проверить DNS и привязку домена к GitHub Pages.

## Правила качества

- Сайт остаётся статическим, пока нет серьёзной причины добавлять сборщик.
- Текст должен быть понятным для человека, а не похожим на машинный перевод.
- Главная страница объясняет миссию и продуктовую идею, а не внутреннюю кухню разработки.
- В репозиторий нельзя добавлять токены, `.env`, tunnel credentials, логи и локальные пути машины.
