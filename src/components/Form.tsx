import { FormEventHandler } from "react";

interface Field {
  calculateDeliveryFee: FormEventHandler<HTMLFormElement>;
  field: any;
  setField: any;
  DatePicker: any;
  handleChange: (date: Date) => void;
}

const Form = ({
  calculateDeliveryFee,
  field,
  setField,
  DatePicker,
  handleChange,
}: Field): JSX.Element => {
  return (
    <form onSubmit={calculateDeliveryFee}>
      <div className="m-2 ">
        <label className="text-white">Cart value: (€)</label>
        <input
          className="bg-gray-50 border-white text-sm rounded-lg block p-2 focus:outline-none"
          placeholder="Value of items"
          type="number"
          value={field.cartValue}
          onChange={(e) => setField({ ...field, cartValue: e.target.value })}
        />
      </div>
      <div className="m-2">
        <label className="text-white">Delivery Distance: (m)</label>
        <input
          className="bg-gray-50 border-white text-sm rounded-lg block p-2 focus:outline-none"
          placeholder="Distance in meters"
          type="number"
          value={field.deliveryDistance}
          onChange={(e) =>
            setField({ ...field, deliveryDistance: e.target.value })
          }
        />
      </div>
      <div className="m-2">
        <label className="text-white">Number of items:</label>
        <input
          className="bg-gray-50 border-white text-sm rounded-lg block p-2 focus:outline-none"
          placeholder="Item count"
          type="number"
          value={field.numberOfItems}
          onChange={(e) =>
            setField({ ...field, numberOfItems: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col m-2">
        <label className="text-white ">Delivery Time:</label>
        <DatePicker
          placeholderText={"Pick a date"}
          className="bg-gray-50 border-white text-sm rounded-lg block p-2 cursor-pointer focus:outline-none"
          selected={field.deliveryDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          onChange={handleChange}
          dateFormat="dd.MM.yyyy | HH:mm"
        />
      </div>

      <button
        className="bg-gray-50  bg-white text-sm rounded-lg block p-2 m-3 text-black"
        type="submit"
      >
        Calculate Delivery Fee
      </button>
    </form>
  );
};

export default Form;
