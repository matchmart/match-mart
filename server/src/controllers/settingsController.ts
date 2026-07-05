import type { Request, Response } from "express";
import WebsiteSettings from "../models/WebsiteSettings";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinaryService";
import { asyncHandler } from "../utils/asyncHandler";
const getOrCreate = async () => (await WebsiteSettings.findOne()) || WebsiteSettings.create({});
export const getSettings = asyncHandler(async (_req: Request, res: Response) => res.json({ success: true, settings: await getOrCreate() }));
export const updateSettings = asyncHandler(async (req: Request, res: Response) => { const settings = await getOrCreate(); Object.assign(settings, req.body); await settings.save(); res.json({ success: true, message: "Settings updated", settings }); });
export const uploadLogo = asyncHandler(async (req: Request, res: Response) => { if(!req.file){res.status(400);throw new Error("Logo file is required")} const settings = await getOrCreate(); const old = settings.logoPublicId; const result = await uploadToCloudinary(req.file.buffer,"match-mart/settings"); settings.logoUrl=result.secure_url; settings.logoPublicId=result.public_id; await settings.save(); if(old) await deleteFromCloudinary(old); res.json({success:true,logoUrl:settings.logoUrl,settings}); });
export const uploadFavicon = asyncHandler(async (req: Request, res: Response) => { if(!req.file){res.status(400);throw new Error("Favicon file is required")} const settings = await getOrCreate(); const old = settings.faviconPublicId; const result = await uploadToCloudinary(req.file.buffer,"match-mart/settings"); settings.faviconUrl=result.secure_url; settings.faviconPublicId=result.public_id; await settings.save(); if(old) await deleteFromCloudinary(old); res.json({success:true,faviconUrl:settings.faviconUrl,settings}); });
