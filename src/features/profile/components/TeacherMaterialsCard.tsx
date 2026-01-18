import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TeacherMaterial, SessionPricing, MaterialType } from '@/features/matching/types';
import { FileText, Video, Youtube, DollarSign, Calendar, Users } from 'lucide-react';

interface TeacherMaterialsCardProps {
  materials: TeacherMaterial[];
  sessionPricing: SessionPricing;
}

const TeacherMaterialsCard: React.FC<TeacherMaterialsCardProps> = ({
  materials,
  sessionPricing
}) => {
  const getMaterialIcon = (type: MaterialType) => {
    switch (type) {
      case MaterialType.PDF:
        return <FileText className="h-4 w-4" />;
      case MaterialType.VIDEO:
        return <Video className="h-4 w-4" />;
      case MaterialType.QUIZ:
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getMaterialTypeColor = (type: MaterialType) => {
    switch (type) {
      case MaterialType.PDF:
        return 'bg-red-100 text-red-800';
      case MaterialType.VIDEO:
        return 'bg-blue-100 text-blue-800';
      case MaterialType.QUIZ:
        return 'bg-green-100 text-green-800';
      case MaterialType.WORKSHEET:
        return 'bg-yellow-100 text-yellow-800';
      case MaterialType.PRESENTATION:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  return (
    <div className="space-y-6">
      {/* Session Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Session Pricing
          </CardTitle>
          <CardDescription>
            Available session types and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-medium">One-on-One</span>
              </div>
              <span className="text-lg font-bold">${sessionPricing.one_on_one_price}/hr</span>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span className="font-medium">Group (max {sessionPricing.max_group_size})</span>
              </div>
              <span className="text-lg font-bold">${sessionPricing.group_price}/hr per student</span>
            </div>
          </div>

          {sessionPricing.discount_packages && sessionPricing.discount_packages.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Package Deals</h4>
              <div className="space-y-2">
                {sessionPricing.discount_packages.map((pkg) => (
                  <div key={pkg.package_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{pkg.name}</span>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${pkg.total_price}</div>
                      <div className="text-sm text-green-600">{pkg.discount_percentage}% off</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Learning Materials
          </CardTitle>
          <CardDescription>
            Educational resources provided by this teacher
          </CardDescription>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No materials available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.filter(m => m.is_active).map((material) => (
                <Card key={material.material_id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getMaterialIcon(material.type)}
                        <h4 className="font-medium">{material.title}</h4>
                      </div>
                      <Badge className={getMaterialTypeColor(material.type)}>
                        {material.type}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {material.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{material.subject} • {material.grade_level}</span>
                      <span>{material.downloads_count} downloads</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {material.youtube_url && (
                          <Youtube className="h-4 w-4 text-red-500" />
                        )}
                        {material.video_url && (
                          <Video className="h-4 w-4 text-blue-500" />
                        )}
                        {material.file_url && (
                          <FileText className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatPrice(material.price)}</div>
                        {material.rating > 0 && (
                          <div className="text-sm text-yellow-600">
                            ★ {material.rating.toFixed(1)}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button className="w-full mt-3" size="sm">
                      {material.price === 0 ? 'Download Free' : 'Purchase'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Session
          </CardTitle>
          <CardDescription>
            Book a session with this teacher
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Users className="h-6 w-6 mb-1" />
              <span>Book One-on-One</span>
              <span className="text-sm text-gray-500">${sessionPricing.one_on_one_price}/hr</span>
            </Button>

            <Button variant="outline" className="h-16 flex-col">
              <Users className="h-6 w-6 mb-1" />
              <span>Book Group Session</span>
              <span className="text-sm text-gray-500">${sessionPricing.group_price}/hr per student</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherMaterialsCard;
