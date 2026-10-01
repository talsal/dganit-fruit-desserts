# קינוחי פירות ביתיים של דגנית · Dganit's Home-Made Fruit Desserts

אתר סטטי (HTML + CSS + JS נקי, בלי build) לעסק ביתי של קינוחי פירות. עברית, RTL, מותאם למובייל.
A static, no-build, Hebrew/RTL site for a home dessert business. Hosted on GitHub Pages.

**Live site:** https://talsal.github.io/dganit-fruit-desserts/

---

## מבנה הקבצים / Structure

```
index.html          the page (sections: hero, desserts, gallery, how-to, order form, about)
css/styles.css      styles
js/app.js           renders cards/gallery, order form, validation, WhatsApp message
data/desserts.js    ALL editable content: price, WhatsApp number, desserts, gallery
images/             dessert photos, placeholders, og-image.jpg (link preview)
images/gallery/     photos shown in the gallery
```

## עריכת קינוחים / Editing desserts

הכול ב-[`data/desserts.js`](data/desserts.js) – לא צריך לגעת ב-HTML.
Everything lives in `data/desserts.js`; no layout changes needed.

- **להוסיף קינוח / add a dessert:** העתיקו בלוק אחד ב-`desserts` ושנו `id`, `name`, `description`, `image`, `alt`.
- **מחיר / price:** `price: 40` – מקום אחד. (הטקסט ב-`<meta>` בראש `index.html` קבוע – אם משנים מחיר, יש לעדכן גם אותו ואת תיאור ה-JSON-LD.)
- **ימי הזמנה מראש / advance notice:** `advanceDays: 7`.
- **מספר וואטסאפ / WhatsApp number:** `whatsapp: "972528674996"` (הטופס). קישורי הטלפון/וואטסאפ בכפתורים נמצאים גם ב-`index.html`.

חפשו `TODO` בקבצים כדי לראות מה עוד צריך אישור או החלפה.

## הוספת תמונות / Adding photos

1. תמונה **מרובעת**, בערך **1000×1000 פיקסלים**, מכווצת (WebP או JPG, עדיף עד ~150KB).
2. שם הקובץ לפי ה-`id` של הקינוח, למשל `images/banana.webp`.
3. הניחו אותה בתיקיית `images/` ועדכנו את השדה `image` של הקינוח ב-`data/desserts.js`.
4. עדכנו `alt` – תיאור קצר בעברית של מה שרואים בתמונה.
5. לגלריה: הוסיפו שורה ב-`gallery` (תמונות בכל יחס, רוחב ~1200px).

Square, ~1000 px, compressed WebP/JPG, named by dessert id. Then update `image` and `alt` in `data/desserts.js`.

כיווץ מהיר / quick compression (ImageMagick):

```bash
magick input.jpg -resize 1000x1000^ -gravity center -extent 1000x1000 -strip -quality 80 images/banana.webp
```

## תצוגה מקומית / Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

> אחרי שינוי בקבצי `css/`, `js/` או `data/` – מעלים את המספר ב-`?v=2` בשלושת הקישורים בתחתית/ראש `index.html`, כדי שהדפדפנים ישכחו את הגרסה הישנה.

## פריסה / Deploy (GitHub Pages)

האתר נפרס מהענף `main`, תיקיית השורש. כל `git push` ל-`main` מעדכן את האתר תוך דקה-שתיים.

```bash
git add -A && git commit -m "Update desserts" && git push
```

הגדרה חד-פעמית / one-time setup: Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
כל הנתיבים יחסיים (בלי `/` בהתחלה) כדי שהאתר יעבוד תחת `/dganit-fruit-desserts/`.

## מה עדיין חסר / Still open

- אישור שמות ותיאורים לקינוחים (הוזנו לפי ההדמיה והפלייר).
- תמונות אמיתיות לבננה ואוכמניות (כרגע איורים זמניים), ותמונה חדה יותר לפטל.
- משלוח או רק איסוף? אזור, מינימום הזמנה.
- מחיר: הפלייר כותב 35–40 ₪, האתר מציג 40 ₪ לכולם.
- ניסוח כשרות: האתר כותב "כשרות בד״ץ · חלב ישראל" (שורה/ים ב-`index.html`: כותרת, תיאורים, כותרת ראשית, "על דגנית" וכותרת תחתונה).
