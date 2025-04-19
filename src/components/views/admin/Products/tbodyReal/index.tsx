export default function tbody(){
    return (
      <div>
        {/* <tbody>
          {productsData.map((product: any, index: number) => (
            <>
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-primary"}
              >
                <td className="text-center" rowSpan={product.stock.length}>
                  {index + 1}
                </td>
                <td className="py-5" rowSpan={product.stock.length}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={100}
                    width={100}
                  />
                </td>
                <td rowSpan={product.stock.length}>{product.name}</td>
                <td rowSpan={product.stock.length} className="text-center">
                  {product.category}
                </td>
                <td rowSpan={product.stock.length} className="text-center">
                  {product.status === "true"
                    ? "Released Hidup"
                    : "Not Released Meninggal"}
                </td>
                <td rowSpan={product.stock.length} className="text-center">
                  {convertIDR(product.price)}
                </td>
                <td rowSpan={product.stock.length} className="text-center">
                  {product.age}
                </td>
                <td className="text-center">{product.stock[0].size}</td>
                    <td className="text-center">{product.stock[0].qty}</td> 
                <td className=" " rowSpan={product.stock.length}>
                  <div className="xl:flex-row flex flex-col items-center justify-center gap-2">
                    <Button
                      type="button"
                      textcolor="text-primary text-xl"
                      bgcolor="bg-accent"
                      onClick={() => {
                        setUpdatedProduct(product);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      type="button"
                      textcolor="text-white/80 text-xl"
                      bgcolor="bg-red-500"
                      onClick={() => setDeletedProduct(product)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
              {product.stock.map(
                (stock: { size: string; qty: string }, index: number) => (
                  <>
                    {index > 0 && (
                      <tr
                        className={
                          index % 2 === 0 ? "bg-gray-800" : "bg-primary"
                        }
                        key={index}
                      >
                        <td className="text-center">{stock.size}</td>
                            <td className="text-center">{stock.qty}</td>
                      </tr>
                    )}
                  </>
                )
              )}
            </>
          ))}
        </tbody> */}
      </div>
    );
}