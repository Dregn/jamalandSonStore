import "./App.css";
import logto from "./assests/J&S_BLACK.png";
import bg from "./assests/bg-pic.jpg";
import SuccessModal from "./components/SuccessModal";
import ErrorModal from "./components/ErrorModal";
import { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://twhflakvqdpqgyipfkej.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3aGZsYWt2cWRwcWd5aXBma2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyNTA0NjcsImV4cCI6MjAyMzgyNjQ2N30.BAySEJh3o_7e_32EpS83tRazLQChA1ovWrCkEs4EXvE"
);

export default function App() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const telRef = useRef(null);
  let [showModal, setShowModal] = useState(false);
  let [showErrorModal, setErrorModal] = useState(false);
  let [errorMessage, setErrorMessage] = useState();

  const resetModal = () => {
    setShowModal(false);
    // Additional reset logic if needed
    nameRef.current.value = "";
    emailRef.current.value = "";
    telRef.current.value = "";
  };
  const resetErrorModal = () => {
    setErrorModal(false);
    setErrorMessage(null)
    // Additional reset logic if needed
    
  };

  const openStoreLocation = () => {
    // Replace the coordinates with your store's latitude and longitude
    const latitude = 10.773500062158613;
    const longitude = 76.65748505290128;

    // Create a Google Maps URL with the specified coordinates
    const mapUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;

    // Open the URL in a new tab or window
    window.open(mapUrl, '_blank');
  };
  function validateEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  const openWhatsApp=()=>{
    window.open(`https://wa.me/+919744477141`, '_blank');
  }

  const handleCallClick = () => {
    window.location.href = `tel:+919744477141`;

  };

  const addUserDetails = async (event) => {
    event.preventDefault();

    const user_name = nameRef.current.value;
    const email_id = emailRef.current.value;
    const mobile_number = telRef.current.value;

    if (!user_name.trim()) {
      // User name is empty or contains only whitespace
      setErrorMessage( "Please enter your name.");
      setErrorModal(true);
      return;
  } else if (!email_id.trim()) {
      // Email is empty or contains only whitespace
      setErrorMessage( "Please enter your email address.");
      setErrorModal(true);
      return;
  } else if (!validateEmail(email_id)) {
      // Invalid email format
      setErrorMessage("Please enter a valid email address.");
      setErrorModal(true);
      return;
  } else if (!mobile_number.trim()) {
      // Mobile number is empty or contains only whitespace
      setErrorMessage("Please enter your mobile number.");
      setErrorModal(true);
      return;
  } else {
      // All fields are filled, proceed with your logic
  }

    let data = await supabase
      .from("UserDetails")
      .insert([
        {
          user_name: user_name,
          email_id: email_id,
          mobile_number: mobile_number,
          location: "India",
        },
      ])
      .single();
    console.log(data)

    setShowModal(true);
  };
  return (
    <div class="container my-12 mx-auto md:px-6 bg-gradient-to-r from-neutral-300 to-stone-400">
      <SuccessModal showModal={showModal} resetModal={resetModal} />
      <ErrorModal showModal={showErrorModal} errorMessage={errorMessage} resetModal={resetErrorModal} />
      <img
        src={logto}
        alt="Jamal Logo"
        className="scale-300 max-w-[100px] mx-auto mb-4"
        style={{ transform: 'scale(2)' }}
      />
      <section class="mb-32">
        <div class="relative lg:h-[50vh] md:h-[35vh] h-[35vh] overflow-hidden bg-cover bg-[50%] bg-no-repeat " style={{ backgroundImage: `url(${bg})`, backgroundPosition: '50%', backgroundRepeat: 'no-repeat' }}></div>
        <div class="container px-6 md:px-12">
          <div class="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
            <div class="flex flex-wrap">
              <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                <form className="p-6 flex flex-col justify-center">
                  <div className="flex flex-col">
                  <h3
                   style={{ color: 'rgb(137 92 53)'}}
                   class="font-semibold text-center mb-8">Please Fill the details To Get Cool Offers!!</h3>
                    <label for="user_name" className="hidden">
                      Full Name
                    </label>
                    <input
                      type="user_name"
                      name="user_name"
                      id="user_name"
                      placeholder="Full Name"
                      ref={nameRef}
                      className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:text-neutral-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label for="email_id" className="hidden">
                      Email
                    </label>
                    <input
                      type="email_id"
                      name="email_id"
                      id="email_id"
                      placeholder="Email"
                      ref={emailRef}
                      className="w-100 mt-2 py-3 px-3 rounded-lg dark:text-neutral-200 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label for="mobile_number" className="hidden">
                      Number
                    </label>
                    <input
                      type="mobile_number"
                      name="mobile_number"
                      id="mobile_number"
                      ref={telRef}
                      placeholder="Mobile Number"
                      className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:text-neutral-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={addUserDetails}
                    type="submit"
                    className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                <div class="flex flex-wrap">

                  <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                    <div class="flex items-start">
                      <div class="shrink-0">
                        <div onClick={openWhatsApp} class="inline-block cursor-pointer rounded-md bg-primary-100 p-4 text-primary">
                          <svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0" />
                            <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white" />
                            <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white" />
                            <defs>
                              <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#5BD066" />
                                <stop offset="1" stop-color="#27B43E" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div onClick={openWhatsApp} class="ml-6 grow">
                        <p class="mb-2 font-bold dark:text-white">WhatsApp</p>
                        <div className="text-md tracking-wide font-semibold w-40 dark:text-neutral-200">
                          +91 97444 77141
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                    <div class="flex items-start">
                      <div class="shrink-0">
                        <div onClick={openStoreLocation} class="inline-block cursor-pointer rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-gray-500 dark:text-neutral-200"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div onClick={openStoreLocation} class="ml-6 grow">
                        <p class="mb-2 font-bold dark:text-white">Location</p>
                        <div className="text-md tracking-wide font-semibold w-40 dark:text-neutral-200">
                          G.B Road Palghat, Kerala, India 678014
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                    <div class="flex items-start">
                      <div class="shrink-0">
                        <div onClick={handleCallClick} class="inline-block cursor-pointer rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-gray-500 dark:text-neutral-200"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div onClick={handleCallClick} class="ml-6 grow">
                        <p class="mb-2 font-bold dark:text-white">
                          Mobile Number
                        </p>
                        <div className="text-md tracking-wide font-semibold w-40 dark:text-neutral-200">
                          +91 97444 77141
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hidden mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                    <div class="align-start flex">
                      <div class="shrink-0">
                        <div class="inline-block rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-6 grow">
                        <p class="mb-2 font-bold dark:text-white">Press</p>
                        <p class="text-neutral-500 dark:text-neutral-200">
                          press@example.com
                        </p>
                        <p class="text-neutral-500 dark:text-neutral-200">
                          +1 234-567-89
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class=" hidden w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                    <div class="align-start flex">
                      <div class="shrink-0">
                        <div class="inline-block rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-6 grow">
                        <p class="mb-2 font-bold dark:text-white">Bug report</p>
                        <p class="text-neutral-500 dark:text-neutral-200">
                          bugs@example.com
                        </p>
                        <p class="text-neutral-500 dark:text-neutral-200">
                          +1 234-567-89
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
