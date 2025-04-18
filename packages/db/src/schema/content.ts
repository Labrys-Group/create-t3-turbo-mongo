import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export enum ContentType {
  TEXT = "text",
  URL = "url",
  // add new content types here
}

@modelOptions({
  schemaOptions: {
    collection: "content",
  },
})
export class ContentClass extends TimeStamps {
  /**
   * The type of content this category contains
   *
   * This should match the name of the zod schema set up in the API
   */
  @prop({ required: true, enum: ContentType })
  public type!: ContentType;

  /**
   * Unique name for the content
   */
  @prop({ required: true, unique: true })
  public name!: string;

  /**
   * Array of content objects
   *
   * These will match the zod schema for the content type
   */
  @prop({ required: true, type: () => Object })
  public content!: object;
}

export const Content =
  (mongoose.models.ContentClass as
    | ReturnModelType<typeof ContentClass>
    | undefined) ?? getModelForClass(ContentClass);
