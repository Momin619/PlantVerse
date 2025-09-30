import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api/api";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { Navbar } from "../ui/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import FormLoader from "../ui/FormLoader";
const EditProduct = () => {
  const { id } = useParams();

  const redirect = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/admin/edit-product/product/${id}`);
      const data = res.data.product;
      console.log(data);
      reset({
        name: data.name,
        stock: data.stock,
        description: data.description,
        price: data.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("stock", data.stock);
      formData.append("description", data.description);
      formData.append("price", data.price);

      // If the user selected a new image, append it
      if (data.imageFile && data.imageFile[0]) {
        formData.append("image", data.imageFile[0]);
      }

      const res = await api.put(`/admin/edit-product/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      redirect("/admin/products");
      toast.success("Product Edited Successfully");
      console.log("✅ Product updated:", res.data);
      // maybe show toast here
    } catch (err) {
      toast.error("Failed to Edit Product");
      console.error("❌ Error updating product:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex my-14 items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Edit Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Product name is required" })}
                placeholder="Enter product name"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 font-bold">{errors.name.message}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                  min: { value: 0, message: "Stock cannot be negative" },
                })}
                placeholder="Enter stock quantity"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.stock
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
              {errors.stock && (
                <p className="text-red-500 font-bold">{errors.stock.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter product description"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none resize-none ${
                  errors.description
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 font-bold">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                {...register("price", {
                  required: "Price is required",
                })}
                placeholder="Enter product price"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none resize-none ${
                  errors.price
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 font-bold">{errors.price.message}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className={`mt-1 w-full px-2 py-1 border rounded-lg focus:outline-none ${
                  errors.image
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
              {errors.image && (
                <p className="text-red-500 font-bold">{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              {isSubmitting ? (
                <FormLoader text="Editing Product..." />
              ) : (
                "Edit Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
