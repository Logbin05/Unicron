import { useForm } from "react-hook-form";
import { useAuthStore } from "@store/auth";
// import { AuthApi } from "@api/auth/auth";
import { useAuthModalStore } from "@store/auth";
import { typeInput } from "@entities/ui/fields";
import { typeButton } from "@entities/ui/button";
import { Fields } from "@components/fields/fields";
import { Button } from "@components/button/button";
import type { AuthLogin } from "@entities/data/auth";
import { useNotificationStore } from "@store/notification";
import { enumNotifications } from "@entities/ui/notifications";

export function LoginForm({ action }: { action: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLogin>({ mode: "onChange" });;
  const { openRegister } = useAuthModalStore();
  const { add_notification } = useNotificationStore.getState();
  // const setAccessToken = useAuthStore((state) => state.setAccessToken);

  async function OnSubmit(data: AuthLogin) {
    try {
      // data = {
      //   login: "user",
      //   password: "12345"
      // }
      // const res = await login_acc(data);
      // setAccessToken(res?.access_token);
      add_notification("Success! Welcome the user!", enumNotifications.success);
      action();
    } catch {
      add_notification(
        "Upss... invalid login or password",
        enumNotifications.error
      );
      console.error("Error during login");
    }
    action();
  }

  return (
    <div className="bg-white rounded-2xl flex flex-col items-center justify-center p-6 md:p-8">
      <div className="flex items-center relative mb-4 w-full justify-center">
        <h4 className="text-center font-semibold text-lg md:text-xl lg:text-2xl">
          Login here!
        </h4>
        <button
          onClick={action}
          className="absolute right-4 top-0 rounded-md p-1 hover:bg-gray-200 active:bg-gray-300"
        ></button>
      </div>

      <button className="text-gray-500 text-sm md:text-base mb-4 hover:underline">
        Forgot your password?
      </button>

      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <Fields
          className="grid grid-cols-1 gap-4 w-full px-4"
          register={register}
          errors={errors}
          fields={[
            {
              name: "login",
              label: "Login",
              required: true,
              type: typeInput.text,
              labelClassName: `text-gray-700 font-light text-sm md:text-base`,
              inputClassName: `border-2 border-gray-300 rounded-xl p-2
                w-full md:w-72 lg:w-80
                active:border-fifth
                focus:ring focus:border-third focus:ring-third`,
            },
            {
              name: "password",
              label: "Password",
              required: true,
              type: typeInput.password,
              labelClassName: `text-gray-700 font-light text-sm md:text-base`,
              inputClassName: `border-2 border-gray-300 rounded-xl p-2
                w-full md:w-72 lg:w-80
                active:border-fifth
                focus:ring focus:border-third focus:ring-third`,
            },
          ]}
        />

        <div className="flex flex-col mt-6 gap-4 w-full md:w-72">
          <Button
            type={typeButton.submit}
            className="bg-fourth text-sixth font-semibold py-2
            rounded-xl transition-all hover:bg-third hover:text-sixth
            active:bg-third active:text-sixth"
          >
            Login
          </Button>

          <Button
            onClick={openRegister}
            type={typeButton.button}
            className="border border-fifth text-fourth font-semibold py-2
            rounded-xl transition-all hover:bg-fifth
            active:bg-fourth active:text-sixth"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
