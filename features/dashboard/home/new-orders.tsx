import ItemListCard from "./item-list-card";

export default function NewOrders() {
  return (
    <section>
      <h2 className="mt-6 mb-4 font-semibold text-lg">New Orders</h2>
      <div className="flex flex-col gap-4">
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
      </div>
    </section>
  );
}
