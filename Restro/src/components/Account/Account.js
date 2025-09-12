import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsersHome,
  setLocationPicker,
  setFinalAddress,
} from "../../redux/slices/address/addressSlice";
import {
  setDetailsType,
  setUserName,
  setEmail,
  setPass,
  setIsAddressAdded,
  setIsLoggedIn,
} from "../../redux/slices/account/accountSlice";
import {
  removeImmutableOrderItemsList,
  setOrderItemsList,
  removeOrderItemsList,
} from "../../redux/slices/orders/ordersSlice";
import { setIsOdered } from "../../redux/slices/cart/cartSlice";
import "./Account.css"

const Account = () => {
  const dispatch = useDispatch();
  const { IsPlaceSelected } = useSelector((store) => store.location);
  const { usersHome, AddressLine2, finalAddress } = useSelector(
    (store) => store.address
  );

  const { detailsType, userName, email, pass, isAddressAdded, isLoggedIn } =
    useSelector((store) => store.account);
  const { immutableOrderItemsList } = useSelector((store) => store.orders);

  const EmailRegex = /^[A-Za-z][A-Za-z0-9]*[@][a-z]+[.][a-z]+$/;
  const [signUsername, setsignUsername] = useState("");
  const [signEmail, setsignEmail] = useState("");
  const [signPass, setsignPass] = useState("");
  const [signErr, setsignErr] = useState("");
  const checkForSign = () => {
    if (signUsername === userName || signEmail === email) {
      setsignErr("User already exists, please login");
      return;
    } else {
      if (!signEmail.trim() || !signPass.trim() || !signUsername.trim()) {
        setsignErr("All fields must be filled in");
        return;
      }

      if (!EmailRegex.test(signEmail)) {
        setsignErr("Email format is not valid");
        return;
      }

      if (signPass.length < 6) {
        setsignErr("Password must be 6 chars min");
        return;
      }
      dispatch(setUserName(signUsername));
      dispatch(setEmail(signEmail));
      dispatch(setPass(signPass));
      dispatch(setDetailsType("account"));
      ClearInputs();
      dispatch(setIsLoggedIn(true));
      dispatch(setUsersHome(""));
      dispatch(setFinalAddress(""));
      dispatch(setIsAddressAdded(false));
      dispatch(removeImmutableOrderItemsList());
    }
  };

  const [loginEmail, setloginEmail] = useState("");
  const [loginPass, setloginPass] = useState("");
  const [loginErr, setloginErr] = useState("");
  const checkForlogin = () => {
    if (loginEmail === email && loginPass === pass) {
      dispatch(setDetailsType("account"));
      dispatch(setIsLoggedIn(true));
      immutableOrderItemsList.map((val) => {
        dispatch(setOrderItemsList(val));
        {
          val && dispatch(setIsOdered(true));
        }
      });
      ClearInputs();
      return;
    } else {
      setloginErr("No match found, please retry");
    }
  };

  const [updateUsername, setupdateUsername] = useState(userName);
  const [updateEmail, setupdateEmail] = useState(email);
  const [updatePass, setupdatePass] = useState(pass);
  const [updateErr, setupdateErr] = useState("");
  const checkForUpdate = () => {
    if (
      updateUsername === userName &&
      updateEmail === email &&
      updatePass === pass
    ) {
      setupdateErr("Nothing has updated, please retry");
      return;
    } else {
      if (!updateEmail.trim() || !updatePass.trim() || !updateUsername.trim()) {
        setupdateErr("All fields must be filled in");
        return;
      }

      if (!EmailRegex.test(updateEmail)) {
        setupdateErr("Email format is not valid");
        return;
      }

      if (updatePass.length < 6) {
        setupdateErr("Password must be 6 chars min");
        return;
      }

      dispatch(setUserName(updateUsername));
      dispatch(setEmail(updateEmail));
      dispatch(setPass(updatePass));
      dispatch(setDetailsType("account"));
      setupdateErr("");
    }
  };

  const ClearInputs = () => {
    setsignUsername("");
    setsignEmail("");
    setsignPass("");
    setloginEmail("");
    setloginPass("");
    sethomeAddress("");
    setsignErr("");
  };

  const [homeAddress, sethomeAddress] = useState(usersHome);
  const doForaddAddress = () => {
    dispatch(setUsersHome(homeAddress));
    dispatch(setFinalAddress(`${homeAddress} ${AddressLine2}`));
    dispatch(setDetailsType("address"));
    dispatch(setIsAddressAdded(true));
  };

  const doForUpdateAddress = () => {
    dispatch(setFinalAddress(`${homeAddress} ${AddressLine2}`));
    dispatch(setDetailsType("address"));
    dispatch(setIsAddressAdded(true));
  };

  return (
    <div className="detailsCont">
      {{
        signup: (
          <div className="userCont">
            <div className="header">
              <h1>User Account</h1>
            </div>
            <div className="signup">
              <div className="title">
                <h1>Sign Up</h1>
              </div>
              <div className="signupinput">
                <div className="username">
                  <input
                    placeholder="Name"
                    maxLength="15"
                    value={signUsername}
                    onChange={(e) => {
                      setsignUsername(e.target.value);
                    }}
                    onClick={() => setsignErr("")}
                  />
                </div>
                <div className="email">
                  <input
                    placeholder="Email Address"
                    maxLength="30"
                    type="email"
                    value={signEmail}
                    onChange={(e) => {
                      setsignEmail(e.target.value);
                    }}
                    onClick={() => setsignErr("")}
                  />
                </div>
                <div className="password">
                  <input
                    placeholder="Password"
                    maxLength="25"
                    value={signPass}
                    onChange={(e) => {
                      setsignPass(e.target.value);
                    }}
                    onClick={() => setsignErr("")}
                  />
                </div>
              </div>
              <div className="actions">
                <button onClick={checkForSign}>Sign Up</button>
              </div>
              <div className="message">
                {signErr && <h1>{signErr}</h1>}
                <h2
                  onClick={() => {
                    dispatch(setDetailsType("login"));
                    ClearInputs();
                  }}
                >
                  Already have an account? Log in →
                </h2>
              </div>
            </div>
          </div>
        ),
        login: (
          <div className="userCont">
            <div className="header">
              <h1>User Account</h1>
            </div>
            <div className="login">
              <div className="title">
                <h1>Login</h1>
              </div>
              <div className="logininput">
                <div className="email">
                  <input
                    placeholder="Email Address"
                    maxLength="30"
                    value={loginEmail}
                    onChange={(e) => {
                      setloginEmail(e.target.value);
                    }}
                    onClick={() => setloginErr("")}
                  />
                </div>
                <div className="password">
                  <input
                    placeholder="Password"
                    maxLength="25"
                    value={loginPass}
                    onChange={(e) => {
                      setloginPass(e.target.value);
                    }}
                    onClick={() => setloginErr("")}
                  />
                </div>
              </div>
              <div className="actions">
                <button onClick={checkForlogin}>Login</button>
              </div>
              <div className="message">
                {loginErr && <h1>{loginErr}</h1>}
                <h2
                  onClick={() => {
                    dispatch(setDetailsType("signup"));
                    ClearInputs();
                  }}
                >
                  Don’t have an account? Sign up →
                </h2>
              </div>
            </div>
          </div>
        ),
        account: (
          <div className="userCont">
            <div className="header">
              <h1>Account Book</h1>
            </div>
            <div className="account">
              <div className="title">
                <h1>{userName}'s Account</h1>
              </div>
              <div className="intro">
                <div className="greet">
                  <h1>Vibin’ with you, {userName} !</h1>
                </div>
              </div>
              <div className="actions">
                <button
                  onClick={() => {
                    dispatch(setDetailsType("update"));
                    setupdateUsername(userName);
                    setupdateEmail(email);
                    setupdatePass(pass);
                  }}
                >
                  <h3>Update</h3>
                </button>
                <button
                  onClick={() => {
                    dispatch(setDetailsType("login"));
                    dispatch(setIsLoggedIn(false));
                    dispatch(removeOrderItemsList());
                    dispatch(setIsOdered(false));
                  }}
                >
                  <h3>Logout</h3>
                </button>
                {isAddressAdded ? (
                  <button
                    onClick={() => {
                      dispatch(setDetailsType("address"));
                    }}
                  >
                    <h3>Saved Address</h3>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      dispatch(setDetailsType("addAddress"));
                    }}
                  >
                    <h3>Set Address</h3>
                  </button>
                )}
              </div>
            </div>
          </div>
        ),
        update: (
          <div className="userCont">
            <div className="header">
              <h1>Account Book</h1>
            </div>
            <div className="update">
              <div className="title">
                <h1>Update</h1>
              </div>
              <div className="updateinput">
                <div className="username">
                  <input
                    placeholder="Name"
                    maxLength="15"
                    value={updateUsername}
                    onChange={(e) => {
                      setupdateUsername(e.target.value);
                    }}
                    onClick={() => setupdateErr("")}
                  />
                </div>
                <div className="email">
                  <input
                    placeholder="Email Address"
                    maxLength="30"
                    type="email"
                    value={updateEmail}
                    onChange={(e) => {
                      setupdateEmail(e.target.value);
                    }}
                    onClick={() => setupdateErr("")}
                  />
                </div>
                <div className="password">
                  <input
                    placeholder="Password"
                    maxLength="15"
                    value={updatePass}
                    onChange={(e) => {
                      setupdatePass(e.target.value);
                    }}
                    onClick={() => setupdateErr("")}
                  />
                </div>
              </div>
              <div className="actions">
                <button onClick={checkForUpdate}>Update</button>
              </div>
              <div className="message">{updateErr && <h1>{updateErr}</h1>}</div>
            </div>
          </div>
        ),
        addAddress: (
          <div className="addressCont">
            <div className="header">
              <h1>Address Book</h1>
            </div>
            <div className="addressSection">
              <div className="addressForm">
                <div className="formTitle">
                  <h1>Enter Your Address</h1>
                </div>
                <div className="formBody">
                  <div className="addressLine1">
                    <label>Address Line 1</label>
                    <input
                      placeholder="Home Address"
                      maxLength="10"
                      value={homeAddress}
                      onChange={(e) => {
                        sethomeAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="addressLine2">
                    <label>Address Line 2</label>
                    <input
                      placeholder="Additional Details"
                      value={AddressLine2 || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="actions">
                  {IsPlaceSelected ? (
                    homeAddress.length === 0 ? (
                      <button>Add Address</button>
                    ) : (
                      <button onClick={doForaddAddress}>Submit</button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(setLocationPicker(true));
                      }}
                    >
                      Set Location
                    </button>
                  )}
                </div>

                {AddressLine2 ? null : <div className="message">
                  <h1
                    onClick={() => {
                      dispatch(setDetailsType("account"));
                    }}
                  >
                    No rush, come back later →
                  </h1>
                </div>}
              </div>
            </div>
          </div>
        ),
        address: (
          <div className="addressCont">
            <div className="header">
              <h1>Address Book</h1>
            </div>

            <div className="addressSection">
              <div className="addressCard">
                <div className="title">
                  <h1>{userName}'s Saved Address</h1>
                </div>
                <div className="addressTop">
                  <div className="addressContent">
                    {AddressLine2 && <h1>{finalAddress}</h1>}
                  </div>
                </div>
                <div className="actions">
                  <button
                    onClick={() => {
                      dispatch(setDetailsType("updateAddress"));
                      sethomeAddress(usersHome);
                    }}
                  >
                    <h3>Update</h3>
                  </button>
                  <button
                    onClick={() => {
                      dispatch(setDetailsType("account"));
                    }}
                  >
                    <h3>Your Profile</h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ),
        updateAddress: (
          <div className="addressCont">
            <div className="header">
              <h1>Address Book</h1>
            </div>
            <div className="addressSection">
              <div className="addressForm">
                <div className="formTitle">
                  <h1>Update Your Address</h1>
                </div>
                <div className="formBody">
                  <div className="addressLine1">
                    <label>Address Line 1</label>
                    <input
                      placeholder="Home Address"
                      maxLength="10"
                      value={homeAddress}
                      onChange={(e) => {
                        sethomeAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="addressLine2">
                    <label>Address Line 2</label>
                    <input
                      placeholder="Additional Details"
                      value={AddressLine2 || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="actions">
                  <button
                    onClick={() => {
                      if (homeAddress.trim()) {
                        doForUpdateAddress();
                      }
                    }}
                  >
                    Update
                  </button>
                </div>

                <div className="message">
                  <h1
                    onClick={() => {
                      dispatch(setLocationPicker(true));
                    }}
                  >
                    New Location? Add from here →
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ),
      }[detailsType] || null}
    </div>
  );
};

export default Account;
