import { Form, Field } from "react-final-form";
import styles from "./signup.module.scss";
import api from '../../api/api';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate()

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const onSubmit = async (values) => {
      try {
          const response = await api.post('/login', {
              email: values.email,
              password: values.password
          });
          localStorage.setItem('accessToken', response.data.access_token);
          localStorage.setItem('refreshToken', response.data.refresh_token);
          navigate('/home');
      } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message);
      }
  };

  return (
    <div className={`${styles.authorization__container} ${styles.container}`}>
      <div className={styles.authorization__wrapper}>
        <h1 className={`text-3xl ${styles.authorization__header}`}>Welcome</h1>
        <span className="text-md">Sign in to continue</span>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              className={styles.authorization__form}
              onSubmit={handleSubmit}
            >
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      type="email"
                      placeholder="Email"
                      className={`${styles.authorization__input} text-sm`}
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className={styles.passwordInputWrapper}>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        className={`${styles.authorization__input} text-sm`}
                      />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className={styles.passwordVisibilityToggle}
                  tabIndex={-1}
                >
                  {passwordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.icon}
                      viewBox="0 0 18 15"
                      fill="none"
                    >
                      <path
                        d="M2.63108 6.29945C2.54541 6.29753 2.63108 6.29945 2.37115 6.29088C2.83912 6.30631 3.27967 6.29088 4.1363 6.29088C5.38453 6.29088 7.22506 6.29088 9 6.29088C10.7749 6.29088 11.9439 6.29088 13.8637 6.29088C14.4854 6.29088 14.8564 6.29088 15.6288 6.29088C14.8319 6.29088 14.4854 6.29088 13.8637 6.29088C11.9439 6.29088 10.7749 6.29088 9 6.29088C7.22506 6.29088 5.18873 6.29088 4.1363 6.29088C3.27754 6.29088 3.24296 6.29945 2.63108 6.29945ZM17.6525 5.76253L16.832 6.29088L17.6525 6.81924L17.6505 6.82214L17.6476 6.82601L17.6378 6.84149L17.6015 6.89375C17.4053 7.17542 17.2002 7.45102 16.9867 7.72015C16.6481 8.14662 16.2907 8.55828 15.9157 8.95394L17.1257 10.5487C17.2815 10.754 17.3484 11.0121 17.3117 11.2661C17.275 11.5202 17.1377 11.7494 16.9299 11.9034C16.8271 11.9797 16.7101 12.0351 16.5855 12.0667C16.461 12.0982 16.3314 12.1052 16.2041 12.0872C15.9471 12.0509 15.7151 11.9152 15.5593 11.7099L14.4854 10.2951C13.2812 11.2889 11.7344 12.2373 9.97901 12.5053V14.0323C9.97901 14.289 9.87586 14.5351 9.69226 14.7166C9.50866 14.898 9.25965 15 9 15C8.74035 15 8.49134 14.898 8.30774 14.7166C8.12414 14.5351 8.02099 14.289 8.02099 14.0323V12.5053C6.26564 12.2373 4.71783 11.2889 3.51463 10.2951L2.44066 11.7099C2.36352 11.8116 2.26688 11.8972 2.15625 11.9619C2.04563 12.0267 1.92318 12.0693 1.79591 12.0872C1.66864 12.1052 1.53903 12.0982 1.41449 12.0667C1.28994 12.0351 1.17291 11.9797 1.07005 11.9034C0.967201 11.8272 0.88055 11.7317 0.815047 11.6223C0.749544 11.513 0.706472 11.3919 0.688291 11.2661C0.670109 11.1403 0.677173 11.0122 0.70908 10.8891C0.740988 10.766 0.797113 10.6503 0.874252 10.5487L2.0843 8.95394C1.52478 8.36289 1.00481 7.73644 0.527684 7.07858C0.471465 7.00028 0.416309 6.92125 0.362232 6.84149L0.352442 6.82601L0.349505 6.82214L0.348526 6.82021C0.348526 6.81924 0.347547 6.81924 1.16795 6.29088L0.347547 5.76253L0.349505 5.75963L0.352442 5.75576L0.362232 5.74027C0.41596 5.66006 0.47145 5.58102 0.528663 5.50319C1.19872 4.57721 1.95522 3.71542 2.78821 2.92917C4.2528 1.54925 6.44871 0 9 0C11.5513 0 13.7462 1.55022 15.2128 2.92723C16.1002 3.76612 16.9004 4.69067 17.6015 5.68705L17.6378 5.73931L17.6476 5.75479L17.6505 5.75866L17.6515 5.7606L17.6525 5.76253ZM16.832 6.29088L17.6525 5.76253L18 6.29088L17.6525 6.81924L16.832 6.29088ZM0.347547 5.76253L1.16795 6.29088L0.347547 6.81924L0 6.29088L0.347547 5.76253Z"
                        fill="#C8C8C8"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.icon}
                      viewBox="0 0 21 15"
                      fill="none"
                    >
                      <path
                        d="M19.9844 7.03625C19.8693 6.74813 17.078 0 10.0368 0C2.9955 0 0.204269 6.74813 0.0891568 7.03625C-0.0297189 7.33406 -0.0297189 7.66625 0.0891568 7.96406C0.204269 8.25188 2.9955 15 10.0368 15C17.078 15 19.8693 8.25188 19.9844 7.96375C20.1033 7.66594 20.1033 7.33406 19.9844 7.03625ZM10.0368 10C8.65103 10 7.52752 8.88063 7.52752 7.5C7.52752 6.11937 8.65103 5 10.0368 5C11.4225 5 12.546 6.11937 12.546 7.5C12.546 8.88063 11.4225 10 10.0368 10Z"
                        fill="#C8C8C8"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className={`${styles.authorization__submitButton} text-sm`}
              >
                Login
              </button>
            </form>
          )}
          
        />
        <button className={`${styles.authorization__toggle} text-sm`} type="button" onClick={() => navigate('/signup')}> Do not have an account? Sign up </button>
      </div>
    </div>
  );
}
