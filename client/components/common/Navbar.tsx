"use client";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const { data, loading, error } = useQuery(GET_DATA, {
    fetchPolicy: "network-only", // Always fetch fresh data from API
  });

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error loading data</p>;

  const user = data?.getData;

  // Links based on user roles
  const links =
    user?.role === "ADMIN"
      ? [
        { href: "/home/lawyers/pending", label: "Pending" },
        { href: "/home/lawyers/accepted", label: "Accepted" },
        { href: "/home/lawyers/blocked", label: "Blocked" },
      ]
      : user?.role === "USER" || user?.role === "LAWYER"
        ? [
          { href: "/home/sessions/active", label: "Active" },
          { href: "/home/sessions/completed", label: "Completed" },
          { href: "/home/sessions/rejected", label: "Rejected" },
          { href: "/home/sessions/pending", label: "Pending" },
        ]
        : [];

  return (
    <nav className="bg-gray-900 text-white p-5 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Dropdown Navigation */}
        <div className="md:hidden">
          <MobileDropdown links={links} />
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  pathname: string;
  children: React.ReactNode;
}

function NavLink({ href, pathname, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-6 py-3 rounded-lg transition duration-300 text-lg font-medium ${pathname.startsWith(href)
        ? "bg-blue-600 text-white shadow-lg"
        : "hover:bg-gray-700 hover:text-gray-300"
        }`}
    >
      {children}
    </Link>
  );
}

// ✅ Mobile Dropdown Component
interface MobileDropdownProps {
  links: { href: string; label: string }[];
}

function MobileDropdown({ links }: MobileDropdownProps) {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      router.push(selectedValue);
    }
  };

  return (
    <select
      className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>
        Select Page
      </option>
      {links.map((link) => (
        <option key={link.href} value={link.href}>
          {link.label}
        </option>
      ))}
    </select>
  );
}