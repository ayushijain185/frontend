import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/resuable/confirm-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useWorkspaceId from "@/hooks/use-workspace-id"
import { deleteTaskMutationFn } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

export function DataTableRowActions({ row }) {
  const [openDeleteDialog, setOpenDialog] = useState(false)
  const queryClient = useQueryClient()
  const workspaceId = useWorkspaceId()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTaskMutationFn
  })

  const taskId = row.original._id
  const taskCode = row.original.taskCode

  const handleConfirm = () => {
    mutate(
      {
        workspaceId,
        taskId
      },
      {
        onSuccess: data => {
          queryClient.invalidateQueries({
            queryKey: ["all-tasks", workspaceId]
          })
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          })
          setTimeout(() => setOpenDialog(false), 100)
        },
        onError: error => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          })
        }
      }
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="cursor-pointer">
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`!text-destructive cursor-pointer ${taskId}`}
            onClick={() => setOpenDialog(true)}
          >
            Delete Task
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isPending}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Task"
        description={`Are you sure you want to delete ${taskCode}`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  )
}
