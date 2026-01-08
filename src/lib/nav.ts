export type NavItemLink = {
  text: string;
  href: string;
  active?: boolean;
};

export type NavItemCategory = {
  key: string;
  label: string;
  icon: string;
  items: NavItemLink[];
};

const CATEGORY_NAME_TO_ICON_MAP = {
  "_default": "fa-solid fa-ellipsis",
  "tutorial": "fa-solid fa-book",
  "ideas": "fa-solid fa-lightbulb",
}

type CategoryNameIconMapKey = keyof typeof CATEGORY_NAME_TO_ICON_MAP;

export const buildNavItems = (opts: { currentPath: string }): {
  home: NavItemLink[];
  categories: NavItemCategory[]
} => {
  const categories: NavItemCategory[] = [];
  const { currentPath } = opts;
  const modules = import.meta.glob("../pages/**/*.astro", { eager: true });

  Object.keys(modules).forEach((file) => {
    const basename = file.split("/").pop() || "";

    if (basename.startsWith("_")) return;
    if (basename === "index.astro") return;
    if (basename === "about.astro") return;
    if (basename === "404.astro") return;

    const parts = file.split("/");
    const pagesIndex = parts.lastIndexOf("pages");
    const relParts = pagesIndex >= 0 ? parts.slice(pagesIndex + 1) : parts.slice(-2);
    const categoryName = relParts[0] || "";
    const slugFile = relParts[relParts.length - 1] || "";
    const slug = slugFile.replace(/\.astro$/, "");

    const href = `/${categoryName}/${slug}`;
    const text = titleFromSlug(slug);

    const item: NavItemLink = {
      text,
      href,
      active: currentPath === href || currentPath.startsWith(href + "/")
    };

    const categoryIndex = categories.findIndex((category) =>
      category.key == categoryName
    );

    if (categoryIndex == -1) {
      categories.push({
        key: categoryName,
        label: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
        icon: Object.keys(CATEGORY_NAME_TO_ICON_MAP).includes(categoryName) ?
          CATEGORY_NAME_TO_ICON_MAP[categoryName as CategoryNameIconMapKey] :
          CATEGORY_NAME_TO_ICON_MAP["_default"],
        items: [item]
      });
    } else {
      categories[categoryIndex].items.push(item);
    }
  });

  const home: NavItemLink[] = [
    { text: "Home", href: "/", active: currentPath === "/" },
    { text: "About", href: "/about", active: currentPath.startsWith("/about") }
  ];

  return { home, categories };
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
