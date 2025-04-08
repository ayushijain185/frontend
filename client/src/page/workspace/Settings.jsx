import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";

const Settings = () => {
  return (
    <div className="w-full h-auto py-2">
      <WorkspaceHeader />
      <Separator className="my-4" />

      <main className="w-full max-w-3xl mx-auto py-3">
        <h2 className="text-2xl font-semibold mb-4">Workspace Settings</h2>

        <section className="space-y-4">
          <EditWorkspaceForm />
          <DeleteWorkspaceCard />
        </section>
      </main>
    </div>
  );
};

export default withPermission(Settings, Permissions.MANAGE_WORKSPACE_SETTINGS);
