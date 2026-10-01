/*
 * Site data. Edit this file to change the menu or the price – no layout changes needed.
 * Loaded as a classic script (no build step), so everything hangs off window.SITE.
 */
window.SITE = {
  // The single place where the price lives (₪ per dessert).
  // Note: the <meta> descriptions in index.html are static text – update them by hand if this changes.
  price: 40,

  // WhatsApp number, international format without "+" (used by the order form).
  whatsapp: "972528674996",

  // Days of advance notice required (from the flyer: "הזמנה שבוע מראש").
  advanceDays: 7,

  // To add a dessert, copy one block below. `id` = file name of the photo, `image` = path to it.
  // Flavors come from Dganit's flyer. TODO: confirm names/descriptions with her.
  // TODO: banana and blueberry still use placeholder illustrations – replace with real photos.
  desserts: [
    {
      id: "mango",
      name: "קינוח מנגו",
      description: "קרם קל וקטיפתי עם לב מנגו עסיסי, במעטפת צהובה.",
      image: "images/mango.webp",
      alt: "חתך של קינוח מנגו עם קרם לבן ולב מנגו כתום",
    },
    {
      id: "strawberry",
      name: "קינוח תות",
      description: "קינוח בצורת לב בציפוי ורוד, עם קרם ולב פירות אדומים.",
      image: "images/strawberry.webp",
      alt: "קינוחי תות בצורת לב בקופסה ורודה",
    },
    {
      id: "raspberry",
      name: "קינוח פטל",
      // TODO: replace with a sharper original photo (the current one is cropped from the flyer)
      description: "קינוח פטל בציפוי אדום, עם קרם וממרח פטל חמצמץ.",
      image: "images/raspberry.webp",
      alt: "שני קינוחי פטל בציפוי אדום",
    },
    {
      id: "coffee-bean",
      name: "קינוח פול קפה",
      description: "קינוח בצורת פול קפה, מצופה שוקולד חלב, עם קרם קפה עדין ושכבת ביסקוויט.",
      image: "images/coffee-bean.webp",
      alt: "קינוח פול קפה מצופה שוקולד על בסיס זהב",
    },
    {
      id: "banana",
      name: "קינוח בננה",
      // TODO: add a real photo (images/banana.webp) and confirm description
      description: "קרם בננה רך ומתוק בציפוי עדין.",
      image: "images/banana-placeholder.svg",
      alt: "איור זמני של קינוח בננה – תמונה אמיתית תתווסף בקרוב",
    },
    {
      id: "blueberry",
      name: "קינוח אוכמניות",
      // TODO: add a real photo (images/blueberry.webp) and confirm description
      description: "קרם עדין עם אוכמניות, בציפוי סגול-כחלחל.",
      image: "images/blueberry-placeholder.svg",
      alt: "איור זמני של קינוח אוכמניות – תמונה אמיתית תתווסף בקרוב",
    },
  ],

  // Photos shown in the gallery strip. TODO: add / replace with more favourites.
  gallery: [
    { image: "images/gallery/coffee-box.webp", alt: "קופסה ורודה עם שישה קינוחי פול קפה" },
    { image: "images/gallery/strawberry-cut.webp", alt: "חתך של קינוח תות עם שכבות קרם וריבת פירות" },
    { image: "images/gallery/mango-cut.webp", alt: "חתך של קינוח מנגו עם לב מנגו" },
    { image: "images/gallery/coffee-bean-cut.webp", alt: "חתך של קינוח פול קפה עם קרם וביסקוויט" },
    { image: "images/gallery/coffee-cut-2.webp", alt: "קינוח פול קפה פתוח בצלחת ורודה בצורת לב" },
    { image: "images/gallery/coffee-bite.webp", alt: "חתך של קינוח פול קפה עם שכבות קרם וביסקוויט" },
    { image: "images/gallery/coffee-beans-paper.webp", alt: "קינוחי פול קפה מצופים שוקולד על נייר אפייה" },
    { image: "images/gallery/coffee-beans-paper-2.webp", alt: "שישה קינוחי פול קפה על נייר אפייה" },
    { image: "images/gallery/coffee-box-closed.webp", alt: "קופסה ורודה סגורה עם קינוחי פול קפה" },
    { image: "images/gallery/coffee-box-closed-2.webp", alt: "קופסת מתנה ורודה עם שישה קינוחי פול קפה" },
    { image: "images/gallery/coffee-box-flowers-1.webp", alt: "קופסה ורודה מקושטת בפרחים יבשים עם קינוחי פול קפה" },
    { image: "images/gallery/coffee-box-flowers-2.webp", alt: "קופסת קינוחי פול קפה עם זר פרחים יבשים ורוד" },
    { image: "images/gallery/coffee-box-flowers-3.webp", alt: "קופסה ורודה עם פרחים יבשים וקינוחי פול קפה" },
    { image: "images/gallery/coffee-box-flowers-4.webp", alt: "קופסה ורודה מקושטת עם קינוחי פול קפה" },
  ],
};
