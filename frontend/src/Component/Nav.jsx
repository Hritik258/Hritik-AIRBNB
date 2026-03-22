import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthDataContext } from './AuthContext';

// ✅ Named export – this is what Nav.jsx imports
export const listingDataContext = createContext();

const ListingProvider = ({ children }) => {
  const { serverUrl } = useContext(AuthDataContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);
  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState("");
  const [currentListing, setCurrentListing] = useState(null);

  useEffect(() => {
    getListing();
  }, []);

  const handleViewCard = async (id) => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      setCurrentListing(result.data);
      console.log("Listing found:", result.data);
      return result.data;
    } catch (error) {
      console.error("handleViewCard error:", error.message);
    }
  };

  const getListing = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/listing/getlisting`,
        { withCredentials: true }
      );
      setListingData(result.data);
      console.log("Listings fetched:", result.data);
    } catch (error) {
      console.error("getListing error:", error.message);
    }
  };

  const deleteListing = async (id) => {
    try {
      await axios.delete(
        `${serverUrl}/api/listing/delete/${id}`,
        { withCredentials: true }
      );
      await getListing();
      console.log("Listing deleted");
    } catch (error) {
      console.error("deleteListing error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Delete failed. Please try again.");
    }
  };

  const addListing = async () => {
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      const result = await axios.post(
        `${serverUrl}/api/listing/addlisting`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      console.log("Listing added:", result.data);
      await getListing();

      setTitle("");
      setDescription("");
      setRent("");
      setCity("");
      setLandmark("");
      setCategory("");
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);

      return result.data;
    } catch (error) {
      console.error("Add listing error:", error.response?.data || error.message);
      throw error;
    } finally {
      setAdding(false);
    }
  };

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredListings = listingData?.filter((listing) => {
    const matchesCategory = activeCategory === 'Trending'
      ? true
      : listing.category?.toLowerCase() === activeCategory?.toLowerCase();

    const matchesSearch = normalizedSearchQuery === ""
      ? true
      : [
          listing.title,
          listing.city,
          listing.landmark,
          listing.category,
          listing.description,
        ].some((value) => value?.toLowerCase().includes(normalizedSearchQuery));

    return matchesCategory && matchesSearch;
  });

  const value = {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
    addListing,
    adding,
    listingData,
    getListing,
    activeCategory, setActiveCategory,
    searchQuery, setSearchQuery,
    filteredListings,
    handleViewCard,
    currentListing,
    setCurrentListing,
    deleteListing,
  };

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
};

export default ListingProvider;
