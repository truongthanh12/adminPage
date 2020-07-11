import React, { useState } from "react";
import "antd/dist/antd.css";
import ContactList from "./ContactList";
import { ContactService } from "../../api/contactService";

const Contact = () => {
  const [contact, setContact] = useState({
    loading: false,
    contactList: [],
  });

  ContactService.contacts().then((data) => {
    setContact({
      loading: true,
      contactList: data,
    });
  });
  return (
    <div>
      <ContactList
        loading={contact.loading}
        contactList={contact.contactList}
      />
    </div>
  );
};
export default Contact;
