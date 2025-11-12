import { useForm } from "react-hook-form";
import { useAuthStore } from "@store/auth";
// import { AuthApi } from "@api/auth/auth";
import { useAuthModalStore } from "@store/auth";
import { typeInput } from "@entities/ui/fields";
import { typeButton } from "@entities/ui/button";
import { Fields } from "@components/fields/fields";
import { Button } from "@components/button/button";
import type { AuthRegister } from "@entities/data/auth";
import { useNotificationStore } from "@store/notification";
import { enumNotifications } from "@entities/ui/notifications";

export function SignUpForm({ action }: { action: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthRegister>({
    mode: "onChange",
  });
  const { openLogin } = useAuthModalStore();
  // const { register_acc, login_acc } = AuthApi();
  const { add_notification } = useNotificationStore.getState();

  const password = watch("password");

  async function OnSubmit(data: AuthRegister) {
    const { confirm_password, policy, ...payload } = data;
    try {
      // await register_acc(payload);
      console.log("payload: ", payload);

      const { email, full_name, ...data } = payload;

      // const res = await login_acc(data);

      // useAuthStore.getState().setAccessToken(res?.access_token);
      add_notification(
        "Success! Welcome to Geneatag!",
        enumNotifications.success
      );

      action();
    } catch {
      console.error("Error during registration");
      add_notification(
        "Upss... invalid data in forms",
        enumNotifications.error
      );
    }
    action();
  }

  return (
    <>
      <div className="bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-center">
          <h4 className="text-center font-semibold text-lg md:text-xl lg:text-2xl">
            Sign up here
          </h4>
          <button
            onClick={action}
            className="active:bg-otc-gray-3 relative xs:left-16 md:left-20
            lg:left-28 xl:left-36
            rounded-md lg:cursor-pointer"
          ></button>
        </div>
        <form
          className="flex justify-center flex-col items-center"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <Fields
            className="grid grid-cols-1 gird-rows-9 gap-2 px-3 font-inter"
            register={register}
            errors={errors}
            fields={[
              {
                name: "full_name",
                label: "Your full name",
                required: true,
                type: typeInput.text,
                labelClassName: `text-gray-700 font-light text-sm md:text-base`,
                inputClassName: `border-2 border-gray-300 rounded-xl p-2 w-full md:w-72
                focus:border-blue-500 focus:ring focus:ring-blue-200`,
                minLength: 5,
                maxLength: 100,
                pattern: {
                  value: /^([А-ЯЁA-Z][а-яёa-z]+)\s([А-ЯЁA-Z][а-яёa-z]+)$/,
                  message: "Invalid format for full name",
                },
              },
              {
                name: "email",
                label: "Email",
                required: true,
                type: typeInput.email,
                labelClassName: `text-gray-700 font-light text-sm md:text-base`,
                inputClassName: `border-2 border-gray-300 rounded-xl p-2 w-full md:w-72
                focus:border-blue-500 focus:ring focus:ring-blue-200`,
                maxLength: 70,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format",
                },
              },
              {
                name: "login",
                label: "Login",
                required: true,
                type: typeInput.text,
                labelClassName: `text-gray-700 font-light text-sm md:text-base`,
                inputClassName: `border-2 border-gray-300 rounded-xl p-2 w-full md:w-72
                focus:border-blue-500 focus:ring focus:ring-blue-200`,
              },
              {
                name: "password",
                label: "Password",
                required: true,
                type: typeInput.password,
                labelClassName: `text-gray-700 font-light text-sm md:text-base`,
                inputClassName: `border-2 border-gray-300 rounded-xl p-2 w-full md:w-72
                focus:border-blue-500 focus:ring focus:ring-blue-200`,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, digit and special character",
                },
              },
              {
                name: "confirm_password",
                label: "Confirm password",
                required: true,
                type: typeInput.password,
                labelClassName: `text-gray-700 font-light text-sm md:text-base`,
                inputClassName: `border-2 border-gray-300 rounded-xl p-2 w-full md:w-72
                focus:border-blue-500 focus:ring focus:ring-blue-200`,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value: string) => {
                  return value === password || "Passwords do not match";
                },
              },
              {
                name: "policy",
                label: "I agree with the personal data processing policy",
                required: true,
                type: typeInput.checkbox,
                labelClassName: `flex justify-center flex-row items-center
                   xs:text-10 xs:gap-x-2 sm:text-14`,
                inputClassName: "",
              },
            ]}
          />
          <div
            className="flex flex-col
                        xs:mt-2 xs:gap-3 xs:py-2 xs:w-3/4
                        xl:w-4/5 xl:mt-4"
          >
            <Button
              type={typeButton.submit}
              className="border border-fifth text-fourth font-semibold py-2
            rounded-xl transition-all hover:bg-fifth
            active:bg-fourth active:text-sixth"
            >
              sing up
            </Button>
            <Button
              onClick={openLogin}
              type={typeButton.button}
              className="border border-fifth text-fourth font-semibold py-2
            rounded-xl transition-all hover:bg-fifth
            active:bg-fourth active:text-sixth"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
