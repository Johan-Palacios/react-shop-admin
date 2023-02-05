import FormProduct from "@components/FormProduct";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import endPoints from "@services/api";
import useAlert from "@hooks/useAlert";
import Alert from "@common/Alert";

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const [error, setError] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      return response;
    }
    getProduct()
      .then((res) => {
        setError(false);
        setProduct(res.data);
      })
      .catch((error) => {
        setError(true);
        setAlert({
          active: true,
          message: error.message,
          type: "error",
          autoClose: true,
        });
      });
  }, [router.isReady, router.query, setAlert]);

  if (error) {
    return <Alert alert={alert} handleClose={toggleAlert} />;
  }
  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <FormProduct product={product} setAlert={setAlert} setOpen={setOpen} />
    </>
  );
}
