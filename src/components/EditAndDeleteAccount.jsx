import { useEffect, useState } from "react";
import useAuth from "../utils/IsAuthenticated";
import handleError from "../utils/ErrorHandler";
import { BsBank2 } from "react-icons/bs";
import { Button, Modal, Popconfirm } from "antd";
import toast from "react-hot-toast";

const EditAndDeleteAccount = () => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
    const [isUpdateShow, setIsUpdateShow] = useState(false);
    const [accountFormData, setAccountFormData] = useState(null);
    console.log("formData", accountFormData);
    const localData = JSON.parse(localStorage.getItem("UserData"));
    const [allAccount, setAllAccount] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccountFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    console.log("editAccountData", accountFormData);

    const showModalUpdate = (data) => {
        setAccountFormData(data);
        setIsUpdateShow(true);
    };

    const handleCancelUpdate = () => {
        setIsUpdateShow(false);
    };

    useEffect(() => {
        const Accounts = async () => {
            if (!isAccessTokenValid()) {
                await fetchAccess();
            }

            try {
                const res = await fetch(
                    `${APIBASEURL}/accounts/account/user_${localData.id}`,
                    {
                        method: "GET",
                        headers: {},
                    }
                );
                const data = await res.json();

                setAllAccount(data);
                if (res.status !== 200) {
                    handleError(res.status);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        };
        Accounts();
    }, [APIBASEURL]);

    const handleAccountDelete = async () => {
        // e.preventDefault();
        if (!isAccessTokenValid()) {
          await fetchAccess();
        }
        const accessToken = localStorage.getItem("accessToken");
    
        try {
          const res = await fetch(
            `${APIBASEURL}/accounts/account_${accountFormData.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            //   body: JSON.stringify(inputData.id),
            }
          );
    
          if (res.status != 200) {
            handleError(res.status);
            return;
          }else{
            toast.success("Account Deleted")
            window.location.reload(false)
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleAccountEdit = async (e) => {
        e.preventDefault();
        if (!isAccessTokenValid()) {
          await fetchAccess();
        }
        const accessToken = localStorage.getItem("accessToken");
    
        try {
          const res = await fetch(
            `${APIBASEURL}/accounts/account_${accountFormData.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(accountFormData),
            }
          );
    
          if (res.status != 200) {
            handleError(res.status);
            return;
          }else{
            toast.success("Account Edited")
            window.location.reload(false)
          }
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <div className="flex flex-col items-center border-t-2 pt-2 mr-2 w-full h-full">
            <h1 className="font-semibold mb-2 text-center text-[#636363]">
                Bank accounts
            </h1>
            <ul className="flex flex-col gap-2 text-sm text-red-500 font-semibold capitalize ml-5">
                {allAccount.map((accounts) => (
                    <li
                        className="flex items-center gap-2 cursor-pointer"
                        key={accounts.id}
                        value={accounts.id}
                        onClick={() => showModalUpdate(accounts)}
                    >
                        <BsBank2 className="text-green-600 text-[15px]" />{" "}
                        {accounts.bankName}&emsp;...{accounts.accountNumber.slice(-4)}
                    </li>
                ))}

                <Modal
                    title="Account Details"
                    open={isUpdateShow}
                    onCancel={handleCancelUpdate}
                    footer={null}
                >
                    <form action="" className="flex flex-col gap-2">
                        <div>
                            <label className="text-[15px] font-bold pl-2">Account Number</label>
                            <input
                                name="accountNumber"
                                type="number"
                                value={accountFormData?.accountNumber || ""}
                                onChange={handleInputChange}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md font-semibold"
                            />
                        </div>
                        <div>
                            <label className="text-[15px] font-bold pl-2">IFSC</label>
                            <input
                                name="ifsc"
                                type="text"
                                value={accountFormData?.ifsc || ''}
                                onChange={handleInputChange}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md font-semibold"
                            />
                        </div>
                        <div>
                            <label className="text-[15px] font-bold pl-2">Branch Name</label>
                            <input
                                name="branch"
                                type="text"
                                value={accountFormData?.branch || ''}
                                onChange={handleInputChange}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md font-semibold"
                            />
                        </div>
                        <div>
                            <label className="text-[15px] font-bold pl-2">Bank Name</label>
                            <input
                                name="bankName"
                                type="text"
                                value={accountFormData?.bankName || ''}
                                onChange={handleInputChange}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md font-semibold"
                            />
                        </div>
                        <div>
                            <label className="text-[15px] font-bold pl-2">Holder’s Name</label>
                            <input
                                name="holderName"
                                type="text"
                                value={accountFormData?.holderName || ''}
                                onChange={handleInputChange}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md font-semibold"
                            />
                        </div>
                        <div className="flex flex-row gap-5 justify-end">
                            <button onClick={handleAccountEdit} type="button"  className="px-3 py-[2px] border-blue-500 hover:border-blue-400 border-[1.5px] rounded-lg   text-[17px] text-blue-500">Edit</button>

                            <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={handleAccountDelete}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
               </Popconfirm>
                            {/* <button onClick={handleAccountDelete} type="button"  className="px-3 py-2 bg-red-500 rounded-lg font-semibold text-white text-[17px]">Delete</button> */}
                        </div>
                    </form>
                </Modal>
            </ul>
        </div>
    );
};

export default EditAndDeleteAccount;
