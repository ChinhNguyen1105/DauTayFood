// src/admin/components/System/SystemStatusOverview.jsx
import React from "react";
import PropTypes from "prop-types";
import { BarChart3, CheckCircle } from "lucide-react";

const SystemStatusOverview = ({ systemStatus }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="mr-2 text-purple-500" />
                Tình trạng hệ thống
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* CPU */}
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                        {systemStatus?.cpu ?? 0}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">CPU Usage</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${systemStatus?.cpu ?? 0}%` }}
                        />
                    </div>
                </div>

                {/* Memory */}
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                        {systemStatus?.memory ?? 0}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Memory</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${systemStatus?.memory ?? 0}%` }}
                        />
                    </div>
                </div>

                {/* Disk */}
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                        {systemStatus?.disk ?? 0}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Disk Space</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-yellow-600 h-2 rounded-full"
                            style={{ width: `${systemStatus?.disk ?? 0}%` }}
                        />
                    </div>
                </div>

                {/* Uptime */}
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                        {systemStatus?.uptime ?? "0d 0h"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Uptime</div>
                    <div className="flex justify-center mt-2">
                        <CheckCircle className="text-green-500" size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

SystemStatusOverview.propTypes = {
    systemStatus: PropTypes.shape({
        cpu: PropTypes.number,
        memory: PropTypes.number,
        disk: PropTypes.number,
        uptime: PropTypes.string,
    }),
};

export default SystemStatusOverview;
