const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/api_formatter.util");
const getSessionAccessData = require("../utils/session_data.util");
const models = require("../models");

const UserModel = models.User;
const UserHasRoleModel = models.UserHasRole;
const RoleHasPermissionModel = models.RoleHasPermission;
const RoleModel = models.Role;
const PermissionModel = models.Permission;
const permissionMiddleware = (definedPermission) => {
	return async (req, res, next) => {
		const accessData = await getSessionAccessData(req);
		const userHasRoleData = await UserHasRoleModel.findAll({
			include: [RoleModel],
			where: {
				user_id: accessData.UID,
			},
		});
		if (!userHasRoleData) {
			res
				.status(httpStatus.FORBIDDEN)
				.json(errorResponse("ERR::1::ROLE NOT FOUND", httpStatus.FORBIDDEN));
		}
		let roleIds = [];
		userHasRoleData?.forEach((value) => {
			roleIds.push(value.role_id);
		});
		const roleHasPermissionData = await RoleHasPermissionModel.findAll({
			include: [PermissionModel],
			where: {
				role_id: roleIds,
			},
		});
		if (!roleHasPermissionData) {
			res
				.status(httpStatus.FORBIDDEN)
				.json(
					errorResponse(
						"ERR::2::ROLE PERMISSION NOT FOUND",
						httpStatus.FORBIDDEN
					)
				);
		}
		let permissionData = [];
		roleHasPermissionData?.forEach((x) => {
			permissionData.push(x.Permission.name);
		});

		const isGranted = definedPermission.some((v) => permissionData.includes(v));

		if (!isGranted) {
			res
				.status(httpStatus.FORBIDDEN)
				.json(errorResponse("ERR::3::PERMISSION DENIED", httpStatus.FORBIDDEN));
		}
		next();
	};
};

module.exports = permissionMiddleware;
