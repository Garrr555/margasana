
import ProductsAdminView from "@/components/views/admin/Products";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

export default function AdminProductsPage({setToaster} : any) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getAllProducts = async () => {
      const {data} = await productServices.getAllProducts()
      setProducts(data.data);
    };
    getAllProducts()
  }, [])
  console.log(products)
  return (
    <ProductsAdminView products={products} setToaster={setToaster}/>
  );
}
