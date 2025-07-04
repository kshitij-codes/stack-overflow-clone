import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = evt.data;

      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        email: email_addresses[0].email_address,
        picture: image_url,
        username: username ?? "",
      });
      return NextResponse.json(
        { message: "OK", user: mongoUser },
        { status: 200 }
      );
    } else if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = evt.data;

      const mongoUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
          email: email_addresses[0].email_address,
          picture: image_url,
          username: username ?? "",
        },
        path: `/profile/${id}`,
      });
      return NextResponse.json(
        { message: "OK", user: mongoUser },
        { status: 200 }
      );
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      const deletedUser = await deleteUser({
        clerkId: id!,
      });
      return NextResponse.json(
        { message: "OK", user: deletedUser },
        { status: 200 }
      );
    }

    return new Response("", { status: 201 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
