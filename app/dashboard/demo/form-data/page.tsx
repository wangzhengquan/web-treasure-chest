/**
 * Skipping re-rendering with useCallback and memo
 */
'use client';
import { memo, useState, useCallback } from 'react';
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ShippingForm({ onSubmit }: { onSubmit: (orderDetails: any) => void }) {
  const [count, setCount] = useState(1);

  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  let startTime = performance.now();
  // while (performance.now() - startTime < 500) {
  //   // Do nothing for 500 ms to emulate extremely slow code
  // }
  // await sleep(1000);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count,
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit} className="block space-y-3">
      <div className="block">
        <span className="inline-block w-32">Number of items:</span>
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-400 "
          onClick={() => setCount(count - 1)}
        >
          –
        </button>
        <span className="p-5">{count}</span>
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-400 "
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
      <label className="block">
        <span className="inline-block w-32"> Street:</span>
        <input name="street" />
      </label>
      <label className="block">
        <span className="inline-block w-32">City:</span>
        <input name="city" />
      </label>
      <label className="block">
        <span className="inline-block w-32">Postal code:</span>
        <input name="zipCode" />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-400 "
      >
        Submit
      </button>
    </form>
  );
}

function ProductPage({
  productId,
  referrerId,
}: {
  productId: number;
  referrerId: string;
}) {
  const [formData, setFormData] = useState(null);
  const handleSubmit = (orderDetails: any) => {
    setFormData(orderDetails);
    post('/product/' + productId + '/buy', {
      referrerId,
      orderDetails,
    });
  };

  return (
    <div>
      <ShippingForm onSubmit={handleSubmit} />
      <code className=" mt-5 block">
        {formData && JSON.stringify(formData, null, 2)}
      </code>
    </div>
  );
}

function post(url: string, data: any) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}

export default function Page() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-xl`}>Form Data</h1>
      </div>
      <ProductPage referrerId="wizard_of_oz" productId={123} />
    </div>
  );
}
