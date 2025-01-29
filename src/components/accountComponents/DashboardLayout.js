import Layout from "@/layout";
import AccountSiderbar from "./AccountSiderbar";

export default function DashboardLayout({ children }) {
  return (
    <Layout>
      <div className="flex flex-wrap lg:flex-nowrap gap-y-9">
        <AccountSiderbar className="w-full"/>
        <div className="w-full lg:grow lg:p-6 p-2">{children}</div>
      </div>
    </Layout>
  );
}
