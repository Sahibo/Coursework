import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/fonts/fonts";
import Layout from "@/components/layout";
import AuthProvider from "@/contexts/AuthContext";
import ProductProvider from "@/contexts/ProductContext";
import CategoryProvider from "@/contexts/CategoryContext";
import CartProvider from "@/contexts/CartContext";


export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce online shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProductProvider>
            <CategoryProvider>
              <CartProvider>
                <Layout>
                  {children}
                </Layout>
              </CartProvider>
            </CategoryProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
