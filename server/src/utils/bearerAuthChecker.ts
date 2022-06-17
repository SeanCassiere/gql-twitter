import { AuthChecker } from "type-graphql";
import { GqlContext } from "./createServer";

const bearerAuthChecker: AuthChecker<GqlContext> = async ({ context }) => {
	if (context.user) {
		return true;
	}
	return false;
};

export default bearerAuthChecker;
