import { AppRouterContext } from "../../main.ts";
import { getClient } from "../utils.ts";
import { Crumb, CrumbKeys } from "./model.ts";

export async function toggleCrumb(
  ctx: AppRouterContext,
  data: Crumb & { connect: boolean },
): Promise<void> {
  const client = await getClient(ctx);

  if (data.connect === true) {
    await client.queryArray({
      text:
        `INSERT INTO ${CrumbKeys.TableName} (${CrumbKeys.ColDuckId}, ${CrumbKeys.ColQuackId}) VALUES ($1, $2) ON CONFLIC DO NOTHING`,
      args: [data.duckId, data.quackId],
    });
  } else {
    await client.queryArray({
      text:
        `DELETE FROM ${CrumbKeys.TableName} WHERE ${CrumbKeys.ColDuckId} = $1 AND ${CrumbKeys.ColQuackId} = $2`,
      args: [data.duckId, data.quackId],
    });
  }

  client.release();
}
