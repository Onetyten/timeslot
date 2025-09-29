"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSlotController = deleteSlotController;
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const slot_schema_1 = __importDefault(require("../schema/slot.schema"));
function deleteSlotController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoConnect_1.default)();
        const userId = req.userId;
        try {
            const { id: slotId } = req.params;
            const slotExists = yield slot_schema_1.default.findById(slotId);
            if (!slotExists) {
                return res.status(404).json({ message: "This slot does not exist", success: false });
            }
            if (slotExists.userId.toString() !== userId) {
                return res.status(401).json({ message: "Not authorized", success: false });
            }
            const deletedSlot = yield slot_schema_1.default.findByIdAndDelete(slotId);
            return res.status(200).json({ message: "Timeslots deleted", data: deletedSlot, success: true });
        }
        catch (error) {
            console.log(`error deleting timeslot ${error}`);
            return res.status(500).json({ message: "Internal server error", error, success: false });
        }
    });
}
