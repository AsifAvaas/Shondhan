import axios from "axios";
import { useEffect, useState } from "react";
import ImageCaptioningComponent from "../Components/ImageCaptioning";

export default function ReportIncident() {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get(
          "https://bdapis.com/api/v1.2/divisions"
        );
        setDivisions(response.data.data);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchDivisions();
  }, []);

  const fetchDistricts = async (division) => {
    const disticts = await axios.get(
      `https://bdapis.com/api/v1.2/division/${division}`
    );
    const districtNames = disticts.data.data.map((item) => item.district);
    setDistricts(districtNames);
    console.log(districtNames);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            {/* Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">
                Report an incident
              </p>
            </div>

            <div className="flex flex-row w-full">
              <div className="w-full">
                {/* Title */}
                <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  Title
                </h3>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <input
                    placeholder="Title"
                    className="form-input flex w-full min-w-0 flex-1 rounded-xl bg-gray-100 h-14 placeholder:text-gray p-[15px] text-base font-normal leading-normal"
                  />
                </div>
              </div>
              <div className="w-full">
                {/* Description */}
                <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  Description
                </h3>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <textarea
                    placeholder="The description of the incident"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 bg-gray-100 focus:min-h-36 placeholder:text-gray p-[15px] text-base font-normal leading-normal"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-row w-full">
              <div className="w-full">
                {/* Location - Division & District Selection */}
                <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  Location
                </h3>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  {/* Division Selection */}
                  <label className="flex flex-col min-w-40 flex-1">
                    <select
                      className="form-input w-full min-w-0 flex-1 rounded-lg bg-gray-100 h-14 placeholder:text-gray p-[15px] text-base font-normal leading-normal"
                      value={selectedDivision}
                      onChange={(e) => {
                        setSelectedDivision(e.target.value);
                        setSelectedDistrict("");
                        fetchDistricts(e.target.value);
                      }}
                    >
                      <option value="">Select Division</option>
                      {divisions.map((division, index) => (
                        <option key={index} value={division.division}>
                          {division.division}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* District Selection */}
                  <label className="flex flex-col min-w-40 flex-1">
                    <select
                      className="form-input w-full min-w-0 flex-1 rounded-xl bg-gray-100 h-14 placeholder:text-gray p-[15px] text-base font-normal leading-normal"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      disabled={!selectedDivision}
                    >
                      <option value="">Select District</option>
                      {selectedDivision &&
                        districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className="w-full">
                {/* Date and Time */}
                <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  Date and time
                </h3>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <input
                    type="date"
                    className="form-input w-full min-w-0 flex-1 rounded-xl bg-gray-100 h-14 placeholder:text-gray p-[15px] text-base font-normal leading-normal"
                  />
                  <input
                    type="time"
                    className="form-input w-full min-w-0 flex-1 rounded-xl bg-gray-100 h-14 placeholder:text-gray p-[15px] text-base font-normal leading-normal"
                  />
                </div>
              </div>
            </div>

            {/* Upload Evidence */}
            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Upload evidence
            </h3>
            <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">
              Videos, photos, or audio. Maximum 10 files.
            </p>
            <ImageCaptioningComponent />

            {/* Submit Button */}
            <div className="flex px-4 py-3 justify-center">
              <button className="text-white flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#000022] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
