import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Select } from "antd";

const Filter = () => {
  const state = useContext(GlobalState);
  const [sort, setSort] = state.productsAPI.sort;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSort(value);
  };
  return (
    <div>
      <Select
        defaultValue=""
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: "",
            label: "Newest",
          },
          {
            value: "sort=oldest",
            label: "Oldest",
          },
          {
            value: "sort=-sold",

            label: "Best sales",
          },
          {
            value: "sort=-price",
            label: "Price: High-Low",
          },
          {
            value: "sort=price",
            label: "Price: Low-High",
          },
        ]}
      />
    </div>
  );
};

export default Filter;
