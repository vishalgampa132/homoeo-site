export const navLinks = [
  { label: "Home", path: "/", exact: true },
  { label: "About Us", path: "/about" },
  { label: "Treatments", path: "/treatments" },
  { label: "Consultation", path: "/consultation" },
  { label: "Contact Us", path: "/contact" }
];

export const breadcrumbMap = {
  "/about": [{ label: "Home", path: "/" }, { label: "About Us" }],
  "/treatments": [{ label: "Home", path: "/" }, { label: "Treatments" }],
  "/consultation": [{ label: "Home", path: "/" }, { label: "Consultation" }],
  "/contact": [{ label: "Home", path: "/" }, { label: "Contact Us" }]
};
