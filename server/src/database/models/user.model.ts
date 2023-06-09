import type { User as IUser } from '~/graphql/schema';
import { Schema, model } from 'mongoose';
import { Provider } from '~/shared/types';

const stringDefault = {
  type: String,
  default: null,
};

export const UserSchema = new Schema<IUser>(
  {
    provider: {
      type: String,
      enum: Object.values(Provider),
      index: true,
    },
    providerId: {
      type: String,
      default: null,
      index: true,
    },
    info: {
      contact: {
        firstName: stringDefault,
        lastName: stringDefault,
        phoneNumber: stringDefault,
      },
      home: {
        address: stringDefault,
        postalCode: stringDefault,
        city: stringDefault,
      },
      billing: {
        name: stringDefault,
        address: stringDefault,
        postalCode: stringDefault,
        city: stringDefault,
      },
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    savedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        default: [],
      },
    ],
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>('User', UserSchema);
